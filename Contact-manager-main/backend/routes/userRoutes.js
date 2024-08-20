const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// User signup
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ name, email, password });

        // Encrypt password before saving to database
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Return jsonwebtoken
        const payload = { user: { id: user.id } };
        jwt.sign(
            payload,
            'your_jwt_secret', // replace with your JWT secret
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id } };
        jwt.sign(
            payload,
            'your_jwt_secret', // replace with your JWT secret
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Email verification
router.get('/verify-email/:token', async (req, res) => {
    try {
        await authController.verifyEmail(req, res);
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
});

// Forgot password
router.post('/forgot-password', async (req, res) => {
    try {
        await authController.forgotPassword(req, res);
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
});

// Reset password
router.post('/reset-password/:token', async (req, res) => {
    try {
        await authController.resetPassword(req, res);
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
});

// Get current user
router.get('/me', authMiddleware.protect, async (req, res) => {
    try {
        await userController.getMe(req, res);
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
});

// Update profile
router.patch('/update-profile', authMiddleware.protect, async (req, res) => {
    try {
        await userController.updateProfile(req, res);
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
});

module.exports = router;
