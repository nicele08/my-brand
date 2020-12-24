import express from 'express';
import {
  addArticle, deleteArticle, getAllArticles, getArticle, updateArticle,
} from '../controllers/articleController';

const artilceRoutes = express.Router();

/**
 * @swagger
 * /articles:
 *  get:
 *    summary: Returns a list of articles
 *    description: <p>You should get all <b>Articles</b> have been posted to this site</p>
 *
 *    responses:
 *      '200':
 *        description: <h1>Gets list of articles</h1>
 */
artilceRoutes.get('/', getAllArticles);

/**
 * @swagger
 * /articles/{articleId}:
 *  get:
 *    summary: Get article by ID
 *    parameters:
 *      - in: path
 *        name: articleId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the article to get
 *    responses:
 *      '200':
 *        description: success
 */
artilceRoutes.get('/:articleId', getArticle);
artilceRoutes.patch('/', updateArticle);
artilceRoutes.post('/', addArticle);

/**
 * @swagger
 * /articles/{articleId}:
 *  delete:
 *    summary: Delete article by ID
 *    parameters:
 *      - in: path
 *        name: articleId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the article to delete
 *    responses:
 *      '200':
 *        description: success
 */
artilceRoutes.delete('/', deleteArticle);

export default artilceRoutes;
