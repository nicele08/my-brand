import mongoose from "mongoose";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

export function userSignup(req, res, next){
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if(user.length >=1){
                return res.status(409).json({
                    message: "Email already exists"
                });
            }else{
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err){
                        return res.status(500).json({
                            error: err
                        });
                    }else{
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            userType: req.body.userType
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User created"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
}

export function userLogin(req, res, next){
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if(user.length < 1){
                return res.status(404).json({
                    message: 'Login failed, either the account doesn\'t exist or you entered a wrong account'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(err){
                    return res.status(404).json({
                        message: 'Login failed, either the account doesn\'t exist or you entered a wrong account'
                    });
                }
                if(result){
                    const token = jsonwebtoken.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, 
                    "secret",
                    {
                        expiresIn: "1h"
                    });
                    return res.status(400).json({
                        message: "Login successful",
                        token: token
                    });
                }

                res.status(401).json({
                    message: 'Login failed, either the account doesn\'t exist or you entered a wrong account'
                });
            });
        });
}