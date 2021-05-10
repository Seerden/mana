import bcrypt from 'bcryptjs';
const { compare } = bcrypt;
import passport from 'passport';
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import { UserModel as User } from '../graphql/types/User';

passport.serializeUser(function (user, done) {
    console.log(user);
    // @ts-ignore
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    console.log(id);
    User.findById(id, null, null, function (err, user) {
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