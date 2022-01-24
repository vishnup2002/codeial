const Comment = require('../models/comment');
const Post = require('../models/post')

module.exports.create = async function(req,res){
    let post = await Post.findById(req.body.postid);

    if (post){
        let comment = await Comment.create({
            content:req.body.content,
            user:req.user._id,
            post:req.body.postid});

        post.comments.push(comment);
        post.save();

        if (req.xhr){
            return res.status(200).json({
                data:{
                    comment:comment
                },
                message:"Comment created!!"
            })
        }
        };

}

module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);
        if (comment&&(comment.user == req.user.id)){
            Post.findByIdAndUpdate(comment.post.id,{$pull:{comments:req.params.id}})
            comment.delete();
            if (req.xhr){
                return res.status(200).json({
                    data:{
                        comment_id:req.params.id
                    },
                    message:"Successfully deleted comment!!"
                })
            }
            return res.redirect('back');

        }
        else{
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return;
    }
    
}
