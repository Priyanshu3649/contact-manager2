const User = require('../models/User');
const Token = require('../models/Token');
const crypto = require('crypto');
const sendEmail = require('../services/emailService');

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ name, email, password });
        await user.save();

        const token = new Token({
            userId: user._id,
            token: crypto.randomBytes(16).toString('hex'),
        });

        await token.save();

        const url = `http://${req.headers.host}/api/auth/verify-email/${token.token}`;
        await sendEmail(user.email, 'Verify Email', `Click this link to verify your email: ${url}`);

        res.status(200).json({ message: 'Verification email sent' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
