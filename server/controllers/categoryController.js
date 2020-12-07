/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import Category from '../models/categoryModel';
import User from '../models/userModel';

export function getAllCategories(req, res) {
  Category.find()
    .select('name _id user')
    .exec()
    .then((docs) => {
      const results = {
        count: docs.length,
        topics: docs.map((doc) => ({
          name: doc.name,
          _id: doc._id,
        })),
      };
      res.status(200).json(results);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function addCategory(req, res) {
  User.findById(req.body.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
      }
      const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        user: req.body.userId,
      });
      return category.save();
    })
    .then((result) => {
      res.status(201).json({
        message: 'Category created successfully',
        createdCategory: {
          _id: result._id,
          name: result.name,
          user: result.user,
        },
        request: {
          type: 'GET',
          url: `http://localhost:3000/article-category/${result._id}`,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
}

export function getCategory(req, res) {
  Category.findById(req.params.categoryId)
    .select('name _id user')
    .populate('user')
    .exec()
    .then((category) => {
      res.status(200).json({
        category,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/article-category',
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
}
