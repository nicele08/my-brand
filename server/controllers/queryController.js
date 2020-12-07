/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import Query from '../models/queryModel';

export function addQuery(req, res) {
  const query = new Query({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });

  query.save()
    .then((result) => {
      res.status(201).json({
        message: 'Query stored successfully',
        id: result._id,
        createdQuery: {
          name: result.name,
          email: result.email,
          message: result.message,
          request: {
            type: 'GET',
            url: `http://localhost:3000/queries/${result._id}`,
          },
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Send query failed',
        error: err,
      });
    });
}

export function getQuery(req, res) {
  const id = req.params.queryId;
  Query.findById(id)
    .select('name email message _id')
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          id: doc._id,
          query: doc,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/queries',
          },
        });
      } else {
        res.status(404).json({
          message: 'Query not found',
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Invalid choice',
        error: err,
      });
    });
}

export function getAllQueries(req, res) {
  Query.find()
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        queries: docs.map((doc) => ({
          name: doc.name,
          email: doc.email,
          message: doc.message,
          _id: doc._id,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/',
          },
        })),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
}

export function updateQuery(req, res) {
  const id = req.params.queryId;
  Query.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
      },
    },
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        nModified: result.nModified,
        message: 'Query updated successfully',
        request: {
          type: 'GET',
          url: `http://localhost:3000/query${id}`,
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

export function deleteQuery(req, res) {
  const id = req.params.queryId;
  Query.deleteOne({ _id: id })
    .exec()
    .then(() => {
      res.status(200).json({
        message: 'Query deleted',
        request: {
          type: 'http://localhost:3000/query',
          body: {
            name: 'String',
            email: 'String',
            message: 'String',
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
}
