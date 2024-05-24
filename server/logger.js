const winston = require('winston');
const { ecsFormat } = require('@elastic/ecs-winston-format');

const logger = winston.createLogger({
    format: ecsFormat(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'logs/app.log',
            maxsize: 1000000
        })
    ]
})

module.exports = { logger };