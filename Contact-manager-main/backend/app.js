const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // Correctly import MongoStore
const flash = require('connect-flash');
const app = express();
const path = require('path');

// Load Config
require('./config/passport-setup');

// Database Config
const mongoDBURI = 'mongodb+srv://pandeypriyanshu53:62I767BpbSb8byS9@priyanshudb.1cssm.mongodb.net/yourDatabaseName'; // Replace `yourDatabaseName` with your actual database name

mongoose.connect(mongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Create a MongoStore instance
const store = MongoStore.create({
    mongoUrl: mongoDBURI,
    mongooseConnection: mongoose.connection, // Only needed if using old version
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());

app.use(session({
    secret: 'your-session-secret',
    resave: false,
    saveUninitialized: false,
    store: store, // Use the MongoStore instance
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/contacts', require('./routes/contactRoutes'));

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to Smart Contact Manager');
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
