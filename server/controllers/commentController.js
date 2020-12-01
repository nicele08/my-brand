import Comment from "../models/commentModel";
import Article from "../models/articleModel";
import mongoose from "mongoose";

export function addComment(req, res, next){
    Article.findById(req.body.articleId)
        .exec()
        .then(article => {
            if(!article){
                res.status(404).json({
                    message: 'Article not found'
                });
            }
            const comment = new Comment({
                _id: new mongoose.Types.ObjectId(),
                article: req.body.articleId,
                user: req.body.userId,
                body: req.body.body
            })
            return comment.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                _id: result._id,
                article: result.article,
                user: resultt.user,
                body: result.body,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/view/' + result._id 
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

export function deleteComment(req, res, next){
    const id = req.params.commentId;
    Comment.deleteOne({_id: id})
        .exec()
        .then(result => {
            console.log(result);
            res.json({
                message: 'Comment deleted',                
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

