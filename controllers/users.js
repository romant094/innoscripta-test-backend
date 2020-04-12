const mongoose = require('mongoose');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {DATABASE_CONNECTION_OPTIONS} = require('../constants');

const connUri = process.env.MONGO_URL;

module.exports = {
    add: (req, res) => {
        mongoose.connect(connUri, DATABASE_CONNECTION_OPTIONS, (err) => {
            let result = {};
            let status = 201;
            if (!err) {
                const {name, password} = req.body;
                const user = new User({name, password});
                user.save((err, user) => {
                    if (!err) {
                        result.status = status;
                        result.result = user;
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
    login: (req, res) => {
        const {name, password} = req.body;

        mongoose.connect(connUri, DATABASE_CONNECTION_OPTIONS, (err) => {
            let result = {};
            let status = 200;
            if (!err) {
                User.findOne({name}, (err, user) => {
                    if (!err && user) {
                        bcrypt.compare(password, user.password).then(match => {
                            if (match) {
                                status = 200;
                                const payload = {user: user.name};
                                const options = {expiresIn: '2d'};
                                const secret = process.env.JWT_SECRET;

                                result.token = jwt.sign(payload, secret, options);
                                result.status = status;
                                result.result = user;
                            } else {
                                status = 401;
                                result.status = status;
                                result.error = `Authentication error`;
                            }
                            res.status(status).send(result);
                        }).catch(err => {
                            status = 500;
                            result.status = status;
                            result.error = err;
                            res.status(status).send(result);
                        });
                    } else {
                        status = 404;
                        result.status = status;
                        result.error = err;
                        res.status(status).send(result);
                    }
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
        mongoose.connect(connUri, DATABASE_CONNECTION_OPTIONS, (err) => {
            let result = {};
            let status = 200;
            if (!err) {
                User.find({}, (err, users) => {
                    if (!err) {
                        result.status = status;
                        result.error = err;
                        result.result = users;
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
