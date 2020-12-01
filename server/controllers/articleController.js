import Category from "../models/categoryModel";
import User from "../models/userModel";
import Article from "../models/articleModel";
import mongoose from "mongoose";
import removeArticleImage from "../functions/removeFile";

export function addArticle(req, res, next){
    User.findById(req.body.userId)
        .exec()
        .then(user => {
            if(user.userType != 'admin'){
                return res.status(404).json({
                    message: "Author not found"
                });
            }
            Category.findById(req.body.categoryId)
                .then(category => {
                    if(!category){
                        return res.status(404).json({
                            message: 'Topic not found'
                        });
                    }
                    const article = new Article({
                        _id: mongoose.Types.ObjectId(),
                        user: user._id,
                        category: category._id,
                        title: req.body.title,
                        visible: req.body.visible,
                        content: req.body.content,
                        articleImage: req.file.path
                    });
                    return article.save();
                })
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: 'Article created successfully',
                        createdArticle: {
                            _id: result._id,
                            author: result.user,
                            topic: result.category,
                            title: result.title,
                            visible: result.visible,
                            content: result.content,
                            articleImage: result.articleImage 
                        },
                        request: {
                            type: 'GET',
                            url: 'http//localhost:3000/article/' + result._id
                        }
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
                
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

export function getAllArticles(req, res, next){
    Article.find()
        .select('title content visible category user')
        .populate('category', 'name')
        .populate('user', 'email')
        .exec()
        .then(docs => {
            res.status(200).json({
                articles: docs.map(doc => {
                    return{
                        _id: doc._id,
                        title: doc.title,
                        content: doc.content,
                        visible: doc.visible,
                        category: doc.category,
                        author: doc.user
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

export function getArticle(req, res, next){
    Article.findById(req.params.articleId)
        .populate('category', 'name')
        .populate('user', 'email')
        .exec()
        .then(article => {

            res.status(200).json({
                article: article,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/article'
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

export function updateArticle(req, res, next){
    const id = req.params.articleId;
    User.findById(req.body.userId)
        .then(user => {
            if(user.userType != 'admin'){
                return res.status(404).json({
                    message: "Author not found"
                });
            }
            Category.findById(req.body.categoryId)
                .then(category => {
                    if(!category){
                        return res.status(404).json({
                            message: 'Topic not found'
                        });
                    }

                    Article.update(
                        {
                            _id: id
                        },
                        {
                            $set:{
                                user: user._id,
                                category: category._id,
                                title: req.body.title,
                                visible: req.body.visible,
                                content: req.body.content,
                                articleImage: req.file.path
                            }
                        }
                    ).exec()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'Article updated successfully',
                            request: {
                                type: 'GET',
                                url: 'http//localhost:3000/article/' + id
                            }
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
                
                
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

export function deleteArticle(req, res, next){
    const id = req.params.articleId;
    removeArticleImage(id);
    Article.deleteOne({_id: id})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Article deleted successfully',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/article',
                    body: {
                        title: 'String',
                        content: 'String',
                        visible: 'Boolean',
                        articleImage: 'String',
                        category: 'Category',
                        user: 'User'
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }) ;

}