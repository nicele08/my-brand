/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import User from '../models/userModel';

export function userSignup(req, res) {
  User.find({ email: req.body.email })
    .exec()
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'Email already exists',
        });
      }
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          res.status(500).json({
            error: err,
          });
        }
        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          password: hash,
          userType: req.body.userType,
        });
        newUser.save()
          .then((result) => {
            res.status(201).json({
              id: result._id,
              message: 'User created',
              user: result,
            });
          })
          .catch((error) => {
            res.status(500).json({
              error,
            });
          });
      });
    });
}

export function getAllUsers(req, res) {
  User.find()
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        users: docs.map((doc) => doc),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function getUser(req, res) {
  const id = req.params.userId;
  User.findById({ _id: id })
    .exec()
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch((err) => res.status(500).json({
      message: 'Invalid request',
      error: err,
    }));
}

export function userLogin(req, res) {
  User.find({ email: req.body.email })
    .exec()
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).json({
          message: 'Login failed, either the account doesn\'t exist or you entered a wrong account',
        });
      }
      // eslint-disable-next-line consistent-return
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(404).json({
            message: 'Login failed, either the account doesn\'t exist or you entered a wrong account',
          });
        }
        if (result) {
          const token = jsonwebtoken.sign({
            email: user[0].email,
            // eslint-disable-next-line no-underscore-dangle
            userId: user[0]._id,
          },
          'secret',
          {
            expiresIn: '1h',
          });
          return res.status(200).json({
            id: user[0]._id,
            message: 'Login successful',
            token,
          });
        }

        res.status(404).json({
          message: 'Login failed, either the account doesn\'t exist or you entered a wrong account',
        });
      });
    })
    .catch(() => {
      res.status(404).json({
        message: 'Login invalid',
      });
    });
}
