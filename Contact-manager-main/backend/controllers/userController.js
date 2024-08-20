const User = require('../models/User');

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
