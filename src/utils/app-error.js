class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.status = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

class NotFoundError extends AppError {
    constructor(message) {
        super(message, 404);
    }
}

module.exports = {
    AppError,
    NotFoundError,
};
