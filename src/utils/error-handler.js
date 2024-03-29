const logger = require('../loggers/winston.log');

const errorHandler = (err, req, res, next) => {
    console.log('==================== Start Error Logger ===============');
    logger.error(err);
    console.log('==================== End Error Logger ===============');

    res.status(err.status || 500);
    res.json({ status: err.status, message: err.message });
};

module.exports = errorHandler;
