const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/models').user;

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback:true
    },
    function(req,email,password,done){
        //find a user and establish the identity
        User.findOne({email:email},function(err,user){
            if (err){
                console.log("Error in finding the user");
                req.flash('error',err);
                return done(err);
            }

            else if (!user || user.password != password){
                console.log('Invalid username/password');
                req.flash('error','Invalid username/password');
                return done(null,false);
            }

            else{
                return done(null,user);

            }
        })
    }


));

//serialising the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});




//deserialising the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if (err){
            console.log("Error in finding the user");
            return done(err);
        }

        return done(null,user);
    });

});

passport.checkAuthentication = function(req,res,next){
    if (req.isAuthenticated()){
        return next();
    }

    return res.redirect('/user/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if (req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}


