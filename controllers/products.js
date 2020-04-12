const mongoose = require('mongoose');
const Products = require('../models/products');

const connUri = process.env.MONGO_URL;

module.exports = {
    add: (req, res) => {
        mongoose.connect(connUri, {useNewUrlParser: true}, (err) => {
            let result = {};
            let status = 201;

            console.log(req.body)
            if (!err) {
                Products.insertMany([...req.body], (err, collections) => {
                    if (!err) {
                        result.status = status;
                        result.result = collections;
                    } else {
                        status = 500;
                        result.status = status;
                        result.error = err;
                    }
                    res.status(status).send(result);
                });
            } else {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }
        });
    },
    getAll: (req, res) => {
        mongoose.connect(connUri, {useNewUrlParser: true}, (err) => {
            let result = {};
            let status = 200;
            const type = req.params['id'];
            const filter = type ? {type}: {};

            if (!err) {
                Products.find(filter, (err, products) => {
                    if (!err) {
                        result.status = status;
                        result.error = err;
                        result.result = products;
                    } else {
                        status = 500;
                        result.status = status;
                        result.error = err;
                    }
                    res.status(status).send(result);
                });
            } else {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }
        });
    }
};
