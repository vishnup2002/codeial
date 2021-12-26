const Post = require('../models/post');
const User = require('../models/models').user;

module.exports.home = async function(req,res){
    try{
        let posts = await Post.find({})
    .populate('user')
    .populate({path:'comments',populate:{path:'user'}})
    
    
    
    let users_list = await User.find({})

    return res.render('social_home_page',{
        posts:posts,
        users_list:users_list
        
    })
    }catch(err){
        console.log(err);
    }
    

}

module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,profile_user){
        if (profile_user){
            return res.render('profile',{
                profile_user:profile_user
                }
            )
        }
        else{
            return res.status(404).send('Not Found');
        }
    })
}
