const winston = require('winston');

const logger = winston.createLogger({
  transports: [new winston.transports.Console({
    level: 'info',
    handleExceptions: true,
    json: true,
    colorize: true
  })],
  exitOnError: false
});

const logOnly = (context, message, scope, service = 'campaign-test') => {
  const obj = {
    context,
    scope,
    defaultMeta: { service: service },
    message: message
  };
  logger.info(obj);
};

module.exports = {
  logOnly
}