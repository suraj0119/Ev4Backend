const { createLogger, format, transports } = require('winston');
const path = require ('path');



const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.printf(({timestamp, message, level, ...meta}) =>{
      return `${timestamp} [${level.toUpperCase()}]: ${message} ${meta ? JSON.stringify(meta) : ''}`;
    })
  ),
  transports: [
    new transports.File({
      filename:path.join(__dirname, '..', 'logs', 'performance.log'),
      level: 'info',
    }),

    new transports.File({
      filename:path.join(__dirname, '..', 'logs', 'error.log'),
      level: 'error',
    }),

    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});

module.exports = logger;