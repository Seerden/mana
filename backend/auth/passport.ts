import bcrypt from 'bcryptjs';
const { compare } = bcrypt;
import passport from 'passport';
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import { dbConn, User } from '../db/db.js'
import { CUser } from '../graphql/types/User.js';

passport.serializeUser(function (user: CUser , done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
        User.findOne({ username }, (err, foundUser) => {
            if (err) {
                return done(null, false, { message: err })
            } else {
                if (!foundUser) {
                    return done(null, false, {message: 'No existing user with that username'})
                } else {
                    compare(password, foundUser.password, (err, didMatch) => {
                        if (err) { throw err }
                        return didMatch ? done(null, foundUser) : done(null, false, { message: 'wrong password' })
                    })
                }
            }
        })
    }))

export default passport;