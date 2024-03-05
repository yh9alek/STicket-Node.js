import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

async function initialize(passport, getUserByEmail, getUserById) {
    console.log('JAJAJAJA');
    const authenticateUser = async (email, password, done) => {
        console.log(email, password);
        const user = getUserByEmail(email);
        if(user == null) {
            return done(null, false, {message: 'No user with that email'});
        }
        try {
            if(await bcrypt.compare(password, user.pass)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch(e) {
            return done(e);
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser));

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id));
    });
}

export default initialize;