
const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.toggleLike = async function(req,res){
    
    //likes/toggle/?id=abcde&type=Post
    try{
        let likeable;
        let deleted = false;

        if (req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        //checking if like exist
        let existingLike = await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user : req.user._id

        })

        if (existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true;
        }
        else{
            let newLike = await Like.create({
                user:req.user._id,
                onModel:req.query.type,
                likeable:req.query.id

            });
            likeable.likes.push(newLike._id);
            likeable.save();
        }

        return res.json(200,{
            message:"Request succssful",
            data:{
                deleted:deleted
            }
        })
    }
    catch(err){
        console.log(err);
        return res.json(500,{
            message:'Internal server error'
        })
    }
}