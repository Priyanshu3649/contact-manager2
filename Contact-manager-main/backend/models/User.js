const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema with all fields combined from both snippets
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Combined name field, required from the second snippet
    email: { type: String, required: true, unique: true },  // Combined email field, required and unique
    password: { type: String, required: true },  // Combined password field, required
    googleId: { type: String },  // Optional field for Google OAuth
    githubId: { type: String },  // Optional field for GitHub OAuth
    profilePicture: { type: String },  // Optional field for storing the profile picture URL
    date: { type: Date, default: Date.now }  // Combined date field from the second snippet
});

// Middleware to hash the password before saving the user document
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', UserSchema);
