const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const keys = require('./config/keys');
const authRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const cloudStorageService = require('./services/cloudstorageservice');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bodyParser = require('body-parser');

// Create a new user model
const User = require('./models/User'); // Ensure this file exists and is properly defined

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Add body parser middleware

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error: ', err));

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Signup Route
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists.' });

    // Create a new user
    const verificationToken = crypto.randomBytes(32).toString('hex');
    user = new User({ email, password, verificationToken });

    await user.save();

    // Send verification email
    const verificationUrl = `http://localhost:3000/verify/${verificationToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Please verify your email',
      html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Registration successful. Please check your email for verification.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Verify Route
app.get('/api/verify/:token', async (req, res) => {
  const { token } = req.params;

  try {
    // Find the user by verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) return res.status(400).json({ message: 'Invalid or expired token.' });

    // Verify the user
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({ success: true, message: 'Email verified successfully. You can now log in.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Existing routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
