/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import Category from '../models/categoryModel';
import User from '../models/userModel';
import Article from '../models/articleModel';
import removeArticleImage from '../functions/removeFile';

export function addArticle(req, res) {
  User.findById(req.body.userId)
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user.userType !== 'admin') {
        return res.status(404).json({
          message: 'Author not found',
        });
      }
      Category.findById(req.body.categoryId)
        .then((category) => {
          if (!category) {
            return res.status(404).json({
              message: 'Topic not found',
            });
          }
          const article = new Article({
            _id: mongoose.Types.ObjectId(),
            user: user._id,
            category: category._id,
            title: req.body.title,
            visible: req.body.visible,
            content: req.body.content,
            articleImage: req.body.articleImage,
          });
          return article.save();
        })
        .then((result) => {
          res.status(201).json({
            message: 'Article created successfully',
            id: result._id,
            createdArticle: {
              _id: result._id,
              author: result.user,
              topic: result.category,
              title: result.title,
              visible: result.visible,
              content: result.content,
              articleImage: result.articleImage,
            },
            request: {
              type: 'GET',
              url: `http//localhost:3000/article/${result._id}`,
            },
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: 'Something is wrong',
            error: err,
          });
        });
    }).catch((err) => {
      res.status(500).json({
        message: 'You are not allowed to add article',
        error: err,
      });
    });
}

export function getAllArticles(req, res) {
  Article.find()
    .select('title content visible category user')
    .populate('category', 'name')
    .populate('user', 'email')
    .exec()
    .then((docs) => {
      res.status(200).json({
        articles: docs.map((doc) => ({
          _id: doc._id,
          title: doc.title,
          content: doc.content,
          visible: doc.visible,
          category: doc.category,
          author: doc.user,
        })),
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
}

export function getArticle(req, res) {
  Article.findById(req.params.articleId)
    .populate('category', 'name')
    .populate('user', 'email')
    .exec()
    .then((article) => {
      res.status(200).json({
        article,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/article',
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Invalid article',
        error: err,
      });
    });
}

export function updateArticle(req, res) {
  const id = req.params.articleId;
  User.findById(req.body.userId)
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user.userType !== 'admin') {
        return res.status(404).json({
          message: 'Author not found',
        });
      }
      Category.findById(req.body.categoryId)
        // eslint-disable-next-line consistent-return
        .then((category) => {
          if (!category) {
            return res.status(404).json({
              message: 'Topic not found',
            });
          }

          Article.updateOne(
            {
              _id: id,
            },
            {
              $set: {
                user: user._id,
                category: category._id,
                title: req.body.title,
                visible: req.body.visible,
                content: req.body.content,
                articleImage: req.body.articleImage,
              },
            },
          ).exec()
            .then((result) => {
              res.status(201).json({
                nModified: result.nModified,
                message: 'Article updated successfully',
                request: {
                  type: 'GET',
                  url: `http//localhost:3000/articles/${id}`,
                },
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: err,
              });
            });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    }).catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
}

export function deleteArticle(req, res) {
  const id = req.params.articleId;
  removeArticleImage(id);
  Article.deleteOne({ _id: id })
    .exec()
    .then(() => {
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
            user: 'User',
          },
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Invalid article',
        error: err,
      });
    });
}
