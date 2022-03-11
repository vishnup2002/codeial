const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create = async function(req,res){
    let post = await Post.create({
        content : req.body.content,
        user: req.user._id
    });

    if (req.xhr){
        return res.status(200).json({
            data:{
                post:post
            },
            message:"Post created!!"
        })
    }


    return res.redirect('back');


    
};

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        if (post && (req.user.id == post.user)){
            post.delete();
            await Comment.deleteMany({post:req.params.id})
            await Like.deleteMany({
                onModel:'Post',
                likeable:req.params.id
            });
            await Like.deleteMany({
                _id:{$in:post.comments}
            })

            if (req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"Successfully deleted post!!"
                })
            }
        
        }
        return res.redirect('back');

    }catch(err){
        console.log(err);
        return;
    }
    
    
}

