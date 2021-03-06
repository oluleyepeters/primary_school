const passport= require('passport');
const LocalStrategy=require('passport-local');
const db=require('./models')
const classTeacher=require('./models/classTeacher')
var crypto=require('crypto');
var flash=require('connect-flash')


passport.serializeUser((user ,done)=>{
    done(null,user)
})


passport.deserializeUser((id, done) => {
    classTeacher.findById(id, function(err,user){
        if(err) done(err);
        if(user){
            done(null,user)
        }
    })
})

passport.use('teacher', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: false
}, function ( username, password, done){
        // 1) Check if the email already exists
        classTeacher.findOne({ 'username': username }, function(err,user){
            if (err)
                return done(err);
            if (!user)
                return done(null, false, {message: 'User does not exist'});
            function hashPassword(str){
                hashingSecret="fuckoff"
                var hash= crypto.createHmac('sha256',hashingSecret).update(str).digest('hex');
                return hash    
            }
            newhashedpassword=hashPassword(password)
            if(newhashedpassword != user.password){
                return done(null, false, { message: 'Incorrect Password' });
        }
		if (!user.active) {
        return done(null, false, { message: 'Sorry, you must validate email first' });
        }
            return done(null, user);
        });
}));