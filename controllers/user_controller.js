const Models = require('../models/models');
const user = Models.user;
const fs = require('fs');
const path = require('path');

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
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success','You have logged out');
    return res.redirect('/user/sign-in');
}

module.exports.updateUser = async function(req,res){
    if (req.user.id == req.params.id){
        try{
            let User = await user.findById(req.params.id);
            user.uploadedAvatar(req,res,function(err){
                if (err){
                    console.log("***Multer Error***");
                    
                }
                else{
                    User.name = req.body.name;
                    User.email = req.body.email;
                    if (req.file){
                        if (fs.existsSync(path.join(__dirname,'..',User.avatar)) && User.avatar!='/uploads/users/avatars/default'){
                            fs.unlinkSync(path.join(__dirname,'..',User.avatar));
                        }
                        //saving path of uploaded file into avatar fied of user
                        User.avatar = user.avatarPath+'/'+req.file.filename;
                    }
                    User.save();
                    return res.redirect('back');
                }
            })
            // user.findByIdAndUpdate(req.user.id,req.body,function(err,user){
            //     return res.redirect('back');
        }catch(err){
            // req.flash('error',err);
            console.log(err);
            return res.redirect('back');
        }
    }
    
    
    else{
        req.flash('error','Unauthorized');
        return res.status(401).send('Unauthorised');
    }

}