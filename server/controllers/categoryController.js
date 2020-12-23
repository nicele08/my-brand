/* eslint-disable no-underscore-dangle */
import Category from '../models/categoryModel';
import User from '../models/userModel';

export function getAllCategories(req, res) {
  Category.find()
    .sort('name')
    .select('_id name')
    .populate('user')
    .exec((err, selectedCategories) => {
      if (err || !selectedCategories[0]) return res.status(404).json({ message: 'Something is wrong' });
      return res.status(200).json({
        countArticleCategories: selectedCategories.length,
        articleCategories: selectedCategories.map((category) => ({
          id: category._id,
          name: category.name,
          createdBy: category.user.email,
        })),
      });
    });
}

export function addCategory(req, res) {
  User.findById({ _id: req.body.userId }, (err, user) => {
    if (err || !user) return res.status(404).json({ message: 'Something is wrong' });
    const articleCategory = new Category({
      name: req.body.name,
      user: req.body.userId,
    });
    return articleCategory.save((error, createdCategory) => {
      if (error || !createdCategory) return res.status(404).json({ message: 'Something is wrong' });
      return res.status(201).json({
        message: 'Article category has been created successfully',
        createdArticleCategory: {
          id: createdCategory._id,
          categoryName: createdCategory.name,
        },
      });
    });
  });
}

export function getCategory(req, res) {
  Category.findById({ _id: req.params.categoryId },
    (err, selectedCategory) => {
      if (err || !selectedCategory) return res.status(404).json({ message: 'Something is wrong!' });
      return res.status(200).json({
        id: selectedCategory._id,
        name: selectedCategory.name,
        createdBy: selectedCategory.user.email,
      });
    });
}

export function updateCategory(req, res) {
  const id = req.body.categoryId;
  User.findById({ _id: req.body.userId }, (err, user) => {
    if (err || !user) return res.status(404).json({ message: 'Something is wrong' });
    return Category.findOneAndUpdate({ _id: id },
      {
        name: req.body.name,
        user: req.body.userId,
      }, { new: true }, (error, updatedCategory) => {
        if (error || !updatedCategory) return res.status(404).json({ message: 'Something is wrong' });
        return res.status(201).json({
          message: 'Article Category updated successfully',
          updates: {
            id: updatedCategory.id,
            name: updatedCategory.name,
            createdBy: updatedCategory.user,
          },
        });
      });
  });
}

export function deleteCategory(req, res, done) {
  Category.deleteOne({ _id: req.body.categoryId }, (err, result) => {
    if (err) return res.status(404).json({ message: 'Something is wrong' });
    if (result.deletedCount === 1) {
      return res.status(201).json({
        message: 'Category has been deleted successfully',
      });
    }
    res.status(500).json({ message: 'Article Category not found' });
    return done(null, result);
  });
}
