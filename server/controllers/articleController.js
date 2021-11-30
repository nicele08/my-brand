/* eslint-disable no-underscore-dangle */
import Category from '../models/categoryModel';
import User from '../models/userModel';
import Article from '../models/articleModel';

export function addArticle(req, res) {
  return User.findById({ _id: req.body.userId }, (err, userFound) => {
    if (err || userFound.userType !== 'admin') return res.status(404).json({ message: 'Author not found or something is wrong' });
    return Category.findById({ _id: req.body.categoryId }, (error, categoryFound) => {
      if (error || !categoryFound) return res.status(404).json({ message: 'Category not found or something is wrong' });
      const article = new Article({
        title: req.body.title,
        visible: req.body.visible,
        content: req.body.content,
        articleImage: req.body.articleImage,
        category: req.body.categoryId,
        user: req.body.userId,
      });
      return article.save((articleError, addedArticle) => {
        if (articleError || !addedArticle) return res.status(404).json({ message: 'Something is wrong' });
        return res.status(201).json({
          message: 'Article created successfully',
          createdArticle: {
            id: addedArticle._id,
            author: addedArticle.user,
            topic: addedArticle.category,
            title: addedArticle.title,
            visible: addedArticle.visible,
            content: addedArticle.content,
            articleImage: addedArticle.articleImage,
          },
          request: {
            type: 'GET',
            url: `http//localhost:3000/article/${addedArticle._id}`,
          },
        });
      });
    });
  });
}

export function getAllArticles(req, res) {
  Article.find()
    .select('title content visible category user')
    .populate('category')
    .populate('user')
    .exec((err, docs) => {
      if (err || !docs[0]) return res.status(404).json({ message: 'No article added yet or somthing is wrong!' });
      return res.status(200).json({
        articles: docs.map((doc) => ({
          id: doc._id,
          title: doc.title,
          content: doc.content,
          visible: doc.visible,
          category: doc.category.name,
          author: doc.user.email,
        })),
      });
    });
}

export function getArticle(req, res) {
  Article.findById(req.params.articleId)
    .populate('category', 'name')
    .populate('user', 'email')
    .exec((err, article) => {
      if (err || !article) return res.status(404).json({ message: 'Article not found or somethin is wrong!' });
      return res.status(200).json({
        id: article._id,
        title: article.title,
        content: article.content,
        visible: article.visible,
        category: article.category.name,
        author: article.user.email,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/article',
        },
      });
    });
}

export function updateArticle(req, res) {
  const id = req.body.articleId;
  User.findById({ _id: req.body.userId }, (err, userFound) => {
    if (err || userFound.userType !== 'admin') return res.status(404).json({ message: 'Author not found or something is wrong' });
    return Category.findById({ _id: req.body.categoryId }, (error, categoryFound) => {
      if (error || !categoryFound) return res.status(404).json({ message: 'Category not found or something is wrong' });
      return Article.updateOne({ _id: id }, {
        title: req.body.title,
        visible: req.body.visible,
        content: req.body.content,
        articleImage: req.body.articleImage,
        category: req.body.categoryId,
        user: req.body.userId,
      }, { new: true }, (newError, updatedArticle) => {
        if (newError || !updatedArticle) return res.status(404).json({ message: 'Something is wrong' });
        return res.status(201).json({
          message: 'Article updated successfully',
          updatedArticle: {
            id: updatedArticle._id,
            author: updatedArticle.user,
            topic: updatedArticle.category,
            title: updatedArticle.title,
            visible: updatedArticle.visible,
            content: updatedArticle.content,
            articleImage: updatedArticle.articleImage,
          },
          request: {
            type: 'GET',
            url: `http//localhost:3000/articles/${updatedArticle._id}`,
          },
        });
      });
    });
  });
}

export function deleteArticle(req, res) {
  const id = req.body.articleId;
  Article.deleteOne({ _id: id })
    .exec((err, deletedArticle) => {
      if (err || deletedArticle.deletedCount !== 1) return res.status(404).json({ message: 'Deletion failed or somethin is wrong' });
      return res.status(201).json({
        message: 'Article deleted successfully',
        request: {
          type: 'POST',
          url: 'http://localhost:3000/articles',
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
    });
}
