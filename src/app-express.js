const express = require('express');
const cors = require('cors');

module.exports = async (app) => {
    //middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true, limit: '1mb' }));
    app.use(cors());

    //router
    app.get('/', function (req, res) {
        res.send('Welcome to Express ');
    });

    //hanlder error
};
