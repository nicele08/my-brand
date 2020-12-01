import View from "../models/viewModel";
import Article from "../models/articleModel";
import mongoose from "mongoose";

export function addView(req, res, next){
    Article.findById(req.body.articleId)
        .exec()
        .then(article => {
            if(!article){
                return res.status(404).json({
                    message: 'Article not found'
                });
            }
            const view = new View({
                _id: new mongoose.Types.ObjectId(),
                article: req.body.articleId,
                user: req.body.userId
            });
            return view.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'View added',
                addView: {
                    _id: result._id,
                    article: result.articleId,
                    user: req.body.userId
                },
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

export function deleteView(req, res, next){
    const id = req.params.viewId;
    View.deleteOne({_id: id})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'View deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}

export function getAllViews(req, res, next){
    View.find()
        .populate('article', 'title')
        .populate('user', 'email')
        .then(docs => {
            const response = {
                count: docs.count,
                views: docs.map(doc => {
                    return{
                        id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http:/localhost:3000/view'
                        }
                    };
                })
            };
            console.log(response);
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}