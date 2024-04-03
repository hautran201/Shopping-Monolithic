const express = require('express');
const cors = require('cors');

const customerRouter = require('./router/customer-router');
const createHttpError = require('http-errors');
const { NotFoundError } = require('./utils/app-error');
const ErrorHandler = require('./middlewares/error-handler');

module.exports = async (app) => {
    //middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true, limit: '1mb' }));
    app.use(cors());

    //router
    app.use('/api/v1/customers', customerRouter);

    app.use((req, res, next) => {
        throw new NotFoundError('API Not Found');
    });
    //error handlers
    app.use(ErrorHandler);
};
