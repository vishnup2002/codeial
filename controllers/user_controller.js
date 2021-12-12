const Models = require('../models/models');
const user = Models.user;

module.exports.signIn = function(req,res){
    if (!req.isAuthenticated()){
        return res.render('user_sign_in');
    }
    return res.redirect('/');
}

module.exports.signUp = function(req,res){
    if (!req.isAuthenticated()){
        return res.render('user_sign_up');
    }
    return res.redirect('/');
}

//creating user
module.exports.createUser = function(req,res){
    if (req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }

    user.findOne({email:req.body.email},function(err,User){
        if (err){
            console.log(err);return;
        }
        if (!User){
            user.create(req.body,function(err,userCreated){
                if (err){
                    console.log(err);return;
                }
                return res.redirect('/user/sign-in');
            });

        }
        else{
            return res.redirect('back');
        }

    })

}

module.exports.createSession = function(req,res){
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/user/sign-in');
}