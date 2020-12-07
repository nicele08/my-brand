import express from 'express';
import {
  userSignup, userLogin, getAllUsers, getUser,
} from '../controllers/userController';

const userRoutes = express.Router();

userRoutes.post('/signup', userSignup);
userRoutes.post('/login', userLogin);
userRoutes.get('/', getAllUsers);
userRoutes.get('/:userId', getUser);

export default userRoutes;
