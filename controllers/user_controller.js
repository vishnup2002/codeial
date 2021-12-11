const Models = require('../models/models');
const user = Models.user;
const homePage = require('./homeController');

module.exports.signIn = function(req,res){
    return res.render('user_sign_in');
}

module.exports.signOut = function(req,res){
    res.clearCookie("user_id");
    return res.redirect('/user/sign-in');
}


module.exports.signUp = function(req,res){
    return res.render('user_sign_up');
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
    user.findOne({email:req.body.email},function(err,User){
        if (err){
            console.log(err);return;
        }
        if (!User){
            return res.redirect('back');
        }
        else{
            if (User.password == req.body.password){
                console.log(User);
                res.cookie('user_id',User._id);
                return res.redirect('/');
            }
            else{
                return res.redirect('back');
            }
        }
    })
}
