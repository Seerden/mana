import bcrypt from 'bcryptjs';
const { hash, compare } = bcrypt;
import passport from 'passport';
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import { dbConn } from '../db/db.js'

const User = dbConn.model('User');

passport.serializeUser(function (user, done) {
    done(null, user.id);
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
                    // make user
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