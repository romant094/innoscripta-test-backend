require('dotenv').config();

const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const routes = require('./routes/index.js');

const app = express();
app.use(cookieParser());
const router = express.Router();
const environment = process.env.NODE_ENV;
const stage = require('./config')[environment];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

if (environment !== 'production') {
    app.use(cors());
    app.use(logger('dev'));
}

app.use('/api/v1', routes(router));

app.use(express.static(path.resolve(__dirname, 'client')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
});

app.listen(`${stage.port}`, () => {
    console.log(`Server is running at port:${stage.port}`);
});

module.exports = app;
