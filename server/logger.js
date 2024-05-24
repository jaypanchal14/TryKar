const winston = require('winston');

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: '../trykar-logs/app.log',
            maxsize: 1000000
        })
    ]
})

module.exports = { logger };