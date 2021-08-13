import logger from 'server/common/logger';
import MediaScrapperService from 'server/api/v1/services/media-scrapper/media.scrapper.service';
import { StatusCodes } from 'http-status-codes';

export class Controller {
  scrapeMedia(req, res, next) {
    logger.info(
      { request: req.body },
      `Media scrapper Request initiated`
    );

    MediaScrapperService.scrapeMedia(req, res, next).then(
      r => {
        logger.info(
          { response: r },
          `Media scrapper response`
        );
        return res.status(StatusCodes.CREATED).json({});
      },
      err => {
        logger.error(
          { error: err.message },
          `Media scrapper error`
        );
        return next(err);
      }
    );
  }
}

export default new Controller();
