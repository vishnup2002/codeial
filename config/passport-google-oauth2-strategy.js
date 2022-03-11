const passport =require('passport');
const googleStrategy  =require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/models').user;


passport.use(new googleStrategy({
        clientID:"965234902921-bfapa9k7dn1akq7baqdq6mcvf6298gk2.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"http://localhost:8000/user/auth/google/callback"
    },
    function(accessToken,refreshToken,profile,done){
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if (err){console.log('error in google-strategy-passport',err);return;}

            console.log(profile);

            if (user){
                return done(null,user);
            }else{
                User.create({
                    name:profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex'),
                    avatar: profile.photos[0].value
                }, function(err,user){
                    if (err){console.log('error in creating user google strategy-passport',err);return;}

                    return done(null,user);
                })
            }
        })
        

    }

))

module.exports = passport;