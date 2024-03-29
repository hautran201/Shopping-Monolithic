const winston = require('winston');
const { combine, timestamp, align, printf } = winston.format;

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'YYYY/MM/DD hh:mm:ss.SSS A' }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ dirname: 'logs', filename: 'error.log' }),
    ],
});

module.exports = logger;
