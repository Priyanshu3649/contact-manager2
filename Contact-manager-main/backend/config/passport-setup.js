const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const keys = require('./keys');
const User = require('../models/User');

// Google OAuth Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if the user already exists
                let existingUser = await User.findOne({ googleId: profile.id });
                
                if (existingUser) {
                    return done(null, existingUser);
                }

                // Create a new user if not existing
                let newUser = await new User({
                    googleId: profile.id,
                    email: (profile.emails && profile.emails[0]) ? profile.emails[0].value : null,
                    name: profile.displayName,
                }).save();

                done(null, newUser);
            } catch (error) {
                done(error, null);
            }
        }
    )
);

// GitHub OAuth Strategy
passport.use(
    new GitHubStrategy(
        {
            clientID: keys.githubClientID,
            clientSecret: keys.githubClientSecret,
            callbackURL: '/auth/github/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if the user already exists
                let existingUser = await User.findOne({ githubId: profile.id });

                if (existingUser) {
                    return done(null, existingUser);
                }

                // Create a new user if not existing
                let newUser = await new User({
                    githubId: profile.id,
                    email: (profile.emails && profile.emails[0]) ? profile.emails[0].value : null,
                    name: profile.displayName,
                }).save();

                done(null, newUser);
            } catch (error) {
                done(error, null);
            }
        }
    )
);

// Serialize user to store in session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            done(null, user);
        })
        .catch((err) => {
            done(err, null);
        });
});
