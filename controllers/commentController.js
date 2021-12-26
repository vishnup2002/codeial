const Comment = require('../models/comment');
const Post = require('../models/post')

module.exports.create = function(req,res){
    Post.findById(req.body.postid,function(err,post){

        if (post){
            Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.postid
            },function(err,comment){
                if (err){
                    console.log(err);
                    return;
                }
                post.comments.push(comment);
                post.save();
            })
        }
        res.redirect('back');
    })
}

module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);
        if (comment&&(comment.user == req.user.id)){
            Post.findByIdAndUpdate(comment.post.id,{$pull:{comments:req.params.id}})
            comment.delete();
            return res.redirect('back');

        }
        else{
            return redirect('back');
        }
    }catch(err){
        console.log(err);
        return;
    }
    
}
