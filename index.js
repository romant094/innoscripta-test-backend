require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes/index.js');

const app = express();
const router = express.Router();
const environment = process.env.NODE_ENV;
const stage = require('./config')[environment];

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

if (environment !== 'production') {
    app.use(logger('dev'));
}

app.use('/api/v1', routes(router));

app.listen(`${stage.port}`, () => {
    console.log(`Server is running at port:${stage.port}`);
});

module.exports = app;
