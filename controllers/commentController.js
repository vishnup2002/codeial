const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');
const Like = require('../models/like');

module.exports.create = async function(req,res){
    let post = await Post.findById(req.body.postid);

    if (post){
        let comment = await Comment.create({
            content:req.body.content,
            user:req.user._id,
            post:req.body.postid});

        post.comments.push(comment);
        post.save();

        comment = await comment.populate('user','name email');
        
        let job = queue.create('email',comment).save(function(err){
            if (err){
                console.log('error in creating a queue ',err);
                return;
            }
            console.log(job.id);
        })
        //commentsMailer.newComment(comment);
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
            await Like.deleteMany({
                onModel:'Comment',
                likeable:req.params.id,
            })
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
