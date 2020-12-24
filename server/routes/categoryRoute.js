import express from 'express';
import {
  addCategory, deleteCategory, getAllCategories, getCategory, updateCategory,
} from '../controllers/categoryController';

const categoryRoutes = express.Router();

/**
 * @swagger
 * /article-categories:
 *  get:
 *    summary: Returns a list of article categories
 *    description: <p>You should get all <b>article categories</b> added to this site</p>
 *
 *    responses:
 *      '200':
 *        description: <h1>Gets list of users</h1>
 */
categoryRoutes.get('/', getAllCategories);

/**
 * @swagger
 * /article-categories/{categoryId}:
 *  get:
 *    summary: Get article category by ID
 *    parameters:
 *      - in: path
 *        name: categoryId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the article category to get
 *    responses:
 *      '200':
 *        description: success
 */
categoryRoutes.get('/:categoryId', getCategory);

/**
 * @swagger
 * /article-categories:
 *  post:
 *    summary: Get article category by ID
 *    parameters:
 *      - in: formData
 *        name: userId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the user is adding article category
 *      - in: formData
 *        name: name
 *        schema:
 *          type: string
 *        required: true
 *        description: name of the article category to add
 *    responses:
 *      '200':
 *        description: success
 */
categoryRoutes.post('/', addCategory);

categoryRoutes.patch('/', updateCategory);

categoryRoutes.delete('/', deleteCategory);

export default categoryRoutes;
