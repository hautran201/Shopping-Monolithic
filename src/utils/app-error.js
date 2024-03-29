class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.status = statusCode;
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
