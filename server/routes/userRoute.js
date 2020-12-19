import express from 'express';
import {
  userSignup, userLogin, getAllUsers, getUser, deleteUser,
} from '../controllers/userController';

const userRoutes = express.Router();

userRoutes.post('/signup', userSignup);

userRoutes.post('/login', userLogin);

/**
 * @swagger
 * /users:
 *  get:
 *    summary: Returns a list of users
 *    description: <p>You should get all <b>Users</b> have been registered to this site</p>
 *
 *    responses:
 *      '200':
 *        description: <h1>Gets list of users</h1>
 */
userRoutes.get('/', getAllUsers);

/**
 * @swagger
 * /users/{userId}:
 *  get:
 *    summary: Get user by ID
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the user to get
 *    responses:
 *      '200':
 *        description: success
 */
userRoutes.get('/:userId', getUser);
userRoutes.delete('/', deleteUser);

export default userRoutes;
