// utils/logger.js
import winston from 'winston';
import pino from 'pino';

// Set up Pino logger for HTTP request logging
const pinoLogger = pino({
  level: 'info',
});

// Set up Winston logger for application-specific logging (errors, custom logs, etc.)
const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Middleware for logging HTTP requests with Pino
export function pinoMiddleware(req, res, next) {
  req.logger = pinoLogger.child({
    requestId: req.headers['x-request-id'] || 'unknown',
  });
  req.logger.info(`Request ${req.method} ${req.url}`);
  next();
}

// Middleware for Winston custom logging (useful for detailed or error logs)
export function winstonLogging(req, res, next) {
  // You can add custom logic here if you want to log specific details of each request
  winstonLogger.info(`Received request: ${req.method} ${req.url}`);
  next();
}

// Export both loggers
export { pinoLogger, winstonLogger };
