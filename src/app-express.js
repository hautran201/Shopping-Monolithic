const express = require('express');
const cors = require('cors');

const customerRouter = require('./router/customer-router');
const errorHandler = require('./utils/error-handler');
const createHttpError = require('http-errors');
const { NotFoundError } = require('./utils/app-error');

module.exports = async (app) => {
    //middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true, limit: '1mb' }));
    app.use(cors());

    //router
    app.use('/api/customers', customerRouter);

    app.use((req, res, next) => {
        // res.status(404).json({
        //     status: 404,
        //     message: 'API Not Found',
        // });
        throw new NotFoundError('Data Not Found');
    });
    //error handlers
    app.use(errorHandler);
};
