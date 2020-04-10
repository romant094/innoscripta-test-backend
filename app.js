const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const database = require('./config/db');
const app = express();
const port = 9000;

app.use(express.json());
//TODO only for develop
app.use(cors());

mongoose.connect(database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    require('./app/routes')(app, db);

    app.use(express.static(path.resolve(__dirname, 'client')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
    });
    app.listen(port, () => console.log(`Server has been started on port ${port}...`));
});
