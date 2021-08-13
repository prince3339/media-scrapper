import * as express from 'express';
import logger from 'server/common/logger';
import controller from './controller';

export default express.Router().get(
  '/',
  (req, res, next) => {
    // Disable logger for health API
    logger.silent();
    next();
  },
  controller.checkHealth
);
