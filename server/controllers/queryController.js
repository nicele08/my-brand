import Query from "../models/queryModel";
import mongoose from "mongoose";

export function addQuery(req, res,next){
    const query = new Query({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });

    query.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Query stored successfully',
                createdQuery: {
                    name: result.name,
                    email: result.email,
                    message: result.message,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/query/' + result._id 
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.json(500).json({
                error: err
            })
        });
}

export function getQuery(req, res, next){
    const id = req.params.queryId;
    Query.findById(id)
        .select('name email message _id')
        .exec()
        .then(doc => {
            if(doc){
                res.status(200).json({
                    query: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/quer'
                    }
                });
            }else{
                res.status(404).json({
                    message: 'Query not found'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

export function getAllQueries(req, res, next){
    Query.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                queries: docs.map(doc => {
                    return{
                        name: doc.name,
                        email: doc.email,
                        message: doc.message,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/' 
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

export function updateQuery(req, res, next){
    const id = req.params.queryId;
    Query.update(
        {
            _id: id,
        },
        {
            $set: {
                name: req.body.name,
                email: req.body.email,
                message: req.body.message
            }
        }
    )
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Query updated successfully',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/query' + id
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

export function deleteQuery(req, res, next){
    const id = req.params.queryId;
    Query.deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Query deleted',
                request: {
                    type: 'http://localhost:3000/query',
                    body: {
                        name: 'String',
                        email: 'String',
                        message: 'String'
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