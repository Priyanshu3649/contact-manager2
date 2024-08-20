const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const config = require('../config/keys');
const User = require('../models/User');

passport.use(
    new GoogleStrategy(
        {
            clientID: config.googleClientID,
            clientSecret: config.googleClientSecret,
            callbackURL: '/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    user = new User({
                        googleId: profile.id,
                        displayName: profile.displayName,
                        email: profile.emails[0].value,
                        imageUrl: profile.photos[0].value,
                    });
                    await user.save();
                }

                done(null, user);
            } catch (err) {
                done(err, null);
            }
        }
    )
);

passport.use(
    new GitHubStrategy(
        {
            clientID: config.githubClientID,
            clientSecret: config.githubClientSecret,
            callbackURL: '/auth/github/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ githubId: profile.id });

                if (!user) {
                    user = new User({
                        githubId: profile.id,
                        displayName: profile.username,
                        email: profile.emails[0].value,
                        imageUrl: profile.photos[0].value,
                    });
                    await user.save();
                }

                done(null, user);
            } catch (err) {
                done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
});

module.exports = passport;
