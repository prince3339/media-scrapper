import logger from 'server/common/logger';
import ErrorResponse from 'server/common/error.response';
import { StatusCodes } from 'http-status-codes';

class MediaScrapperService {
  async scrapeMedia(req) {
    logger.info(`${this.constructor.name}.scrapeMedia()`);
    try {
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export default new MediaScrapperService();
