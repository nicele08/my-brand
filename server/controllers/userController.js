/* eslint-disable no-underscore-dangle */
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/userModel';

dotenv.config();

export function userSignup(req, res) {
  User.find({ email: req.body.email })
    .exec((err, user) => {
      if (err || user.length >= 1) return res.status(404).json({ message: 'Email already exists' });
      return bcrypt.hash(req.body.password, 10, (hashError, hash) => {
        if (hashError || !hash) return res.status(500).json({ message: 'Something is wrong' });
        const newUser = new User({
          email: req.body.email,
          password: hash,
          userType: req.body.userType,
        });
        return newUser.save((error, createdUser) => {
          if (error || !createdUser) return res.status(404).json({ message: 'You can\'t create an account' });
          return res.status(201).json({
            message: 'User created',
            id: createdUser._id,
            email: createdUser.email,
            password: createdUser.password,
          });
        });
      });
    });
}

export function getAllUsers(req, res) {
  User.find()
    .exec((err, docs) => {
      if (err || !docs[0]) return res.status({ message: 'No user added yet' });
      return res.status(200).json({
        countUsers: docs.length,
        users: docs.map((doc) => ({
          id: doc._id,
          email: doc.email,
          userType: doc.userType,
        })),
      });
    });
}

export function getUser(req, res) {
  const id = req.params.userId;
  User.findById({ _id: id })
    .exec((err, user) => {
      if (err || !user) return res.status(404).json({ message: 'User not found or something is wrong' });
      return res.status(200).json({
        id: user._id,
        email: user.email,
        password: user.password,
        userType: user.userType,
      });
    });
}

export function deleteUser(req, res) {
  const id = req.body.userId;
  User.deleteOne({ _id: id }, (err, deletedUser) => {
    if (err || deletedUser.deletedCount !== 1) return res.status(404).json({ message: 'Deletion failed' });
    return res.status(200).json({
      message: 'User has been deleted',
    });
  });
}

export function userLogin(req, res) {
  User.find({ email: req.body.email })
    .exec((err, users) => {
      if (err || users.length < 1) return res.status(404).json({ message: 'Login failed' });
      return bcrypt.compare(req.body.password, users[0].password, (error, result) => {
        if (error || !result) return res.status(404).json({ message: 'Something is wrong' });
        const token = jsonwebtoken.sign({
          email: users[0].email,
          userId: users[0]._id,
        },
        process.env.JWT_TOKEN,
        {
          expiresIn: '1h',
        });
        return res.status(200).json({
          message: 'Login successful',
          token,
        });
      });
    });
}
