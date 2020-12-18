import express from 'express';
import {
  userSignup, userLogin, getAllUsers, getUser, deleteUser,
} from '../controllers/userController';

const userRoutes = express.Router();

// Routes
/**
 * @swagger
 * /signup:
 * get:
 *  description: Signup by valid email and password
 *  responses:
 *    '201':
 *      description: A successful reponse
 */
userRoutes.post('/signup', userSignup);
userRoutes.post('/login', userLogin);
userRoutes.get('/', getAllUsers);
userRoutes.get('/:userId', getUser);
userRoutes.delete('/', deleteUser);

export default userRoutes;
