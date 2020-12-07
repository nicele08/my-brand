/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import User from '../models/userModel';
import Profile from '../models/profileModel';

export function addProfile(req, res) {
  User.findById(req.body.userId)
    .exec()
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
      }
      const profile = new Profile({
        _id: mongoose.Types.ObjectId(),
        user: req.body.userId,
        profileImage: req.body.profileImage,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        location: req.body.location,
        phoneNumber: req.body.phoneNumber,
      });
      profile.save()
        .then((result) => {
          res.status(201).json({
            id: result._id,
            message: 'Profile created',
            createdProfile: {
              _id: result._id,
              user: result.user,
              profileImage: result.profileImage,
              firstName: result.firstName,
              lastName: result.lastName,
              location: result.location,
              phoneNumber: result.phoneNumber,
            },
            request: {
              request: {
                type: 'GET',
                url: `http://localhost:3000/profile/${result._id}`,
              },
            },
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: 'Invalid choice',
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Not allowed',
        error: err,
      });
    });
}

export function getProfile(req, res) {
  Profile.findById(req.params.profileId)
    .populate('user')
    .exec()
    .then((profile) => {
      res.status(200).json({
        id: profile._id,
        profile,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/profile',
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Invalid choice',
        error: err,
      });
    });
}

export function getAllProfiles(req, res) {
  Profile.find()
    .populate('user')
    .exec()
    .then((docs) => {
      res.status(200).json({
        profiles: docs.map((doc) => ({
          _id: doc._id,
          profileImage: doc.profileImage,
          firstName: doc.firstName,
          lastName: doc.lastName,
          location: doc.location,
          phoneNumber: doc.phoneNumber,
          request: {
            type: {
              type: 'POST',
              url: `http://localhost:3000/profile/${doc._id}`,
            },
          },
        })),
      });
    })
    .catch((err) => {
      res.json(500).json({
        error: err,
      });
    });
}

export function updateProfile(req, res) {
  const id = req.params.profileId;
  User.findById(req.body.userId)
    .exec()
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
      }

      Profile.update(
        {
          _id: id,
        },
        {
          $set: {
            profileImage: req.body.profileImage,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthday: req.body.birthday,
            location: req.body.location,
            phoneNumber: req.body.phoneNumber,
          },
        },
      )
        .exec()
        .then(() => {
          res.status(200).json({
            message: 'Profile updated successfully',
            request: {
              type: 'GET',
              url: `http://localhost:3000/profile/${id}`,
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
}

export function deleteProfile(req, res) {
  const id = req.params.profileId;
  Profile.deleteOne({ _id: id })
    .exec()
    .then(() => {
      res.status(200).json({
        message: 'Profile deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:3000/profile',
          body: {
            profileImage: 'String',
            firstName: 'String',
            lastName: 'String',
            birthday: 'String',
            location: 'String',
            phoneNumber: 'String',
          },
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
}
