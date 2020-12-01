import User from "../models/userModel";
import Profile from "../models/profileModel";
import mongoose from "mongoose";


export function addProfile(req, res, next){
    User.findById(req.body.userId)
        .exec()
        .then(user => {
            if(!user){
                return res.status(404).json({
                    message: 'User not found'
                });
            }
            const profile = new Profile({
                _id: mongoose.Types.ObjectId(),
                user: user._id,
                profileImage: req.file.profileImage,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthday: req.body.birthday,
                location: req.body.location,
                phoneNumber: req.body.phoneNumber
            });
            return profile.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Profile created',
                createdProfile: {
                    _id: result._id,
                    user: result.user,
                    profileImage: result.profileImage,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    location: result.location,
                    phoneNumber: result.phoneNumber
                },
                request: {
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/profile/' + result._id
                    }
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

export function getProfile(req, res, next){
    Profile.findById(req.params.profileId)
        .populate('user')
        .exec()
        .then(profile => {
            console.log(profile);
            res.status(200).json({
                profile: profile,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/profile'
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

export function getAllProfiles(req, res, next){
    Profile.find()
        .populate('user')
        .exec()
        .then(docs => {
            res.status(200).json({
                profiles: docs.map(doc => {
                    return{
                        _id: doc._id,
                        profileImage: doc.profileImage,
                        firstName: doc.firstName,
                        lastName: doc.lastName,
                        location: doc.location,
                        phoneNumber: doc.phoneNumber,
                        request: {
                            type:{
                                type: 'POST',
                                url: 'http://localhost:3000/profile/' + doc._id 
                            }
                        }
                    };
                })
            });
        })
        .catch(err => {
            console.log(err);
            res.json(500).json({
                error: err
            });
        });
}

export function updateProfile(req, res, nex){
    const id = req.params.profileId;
    User.findById(req.body.userId)
        .exec()
        .then(user => {
            if(!user){
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            Profile.update(
                {
                    _id: id
                },
                {
                    $set: {
                        profileImage: req.file.profileImage,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        birthday: req.body.birthday,
                        location: req.body.location,
                        phoneNumber: req.body.phoneNumber
                    }
                }
            )
            .exec()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    message: 'Profile updated successfully',
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/profile/' + id
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err,
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

export function deleteProfile(req, res, next){
    const id = req.params.profileId
    Profile.deleteOne({_id: id})
            .exec()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    message: 'Product deleted',
                    request: {
                        type: 'POST',
                        url: 'http://localhost:3000/profile',
                        body: {
                            profileImage: 'String',
                            firstName: 'String',
                            lastName: 'String',
                            birthday: 'String',
                            location: 'String',
                            phoneNumber: 'String'
                        }
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

