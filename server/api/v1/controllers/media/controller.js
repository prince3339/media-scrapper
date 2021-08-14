import logger from 'server/common/logger';
import MediaScrapperService from 'server/api/v1/services/media-scrapper/media.scrapper.service';
import ErrorResponse from 'server/common/error.response';
import { StatusCodes } from 'http-status-codes';

export class Controller {
  scrapeMedia(req, res, next) {
    logger.info({ request: req.body }, 'Media scrapper Request initiated');

    MediaScrapperService.scrapeMedia(req, res, next).then(
      r => {
        logger.info({ response: r }, 'Media scrapper response');
        return res.status(StatusCodes.CREATED).json(r);
      },
      err => {
        logger.error({ error: err.message }, 'Media scrapper error');
        return next(err);
      }
    );
  }

  getMediaList(req, res, next) {
    logger.info({ request: req.body }, 'Media List Request initiated');
    const { type, searchText, offset, limit, sort } = req?.query;
    MediaScrapperService.getMediaList(
      type,
      searchText,
      offset,
      limit,
      sort
    ).then(
      response => {
        logger.info({ response }, 'Media List response');

        if (!response.success) {
          throw new ErrorResponse({
            status: StatusCodes.BAD_REQUEST,
            message: response.message
          });
        }
        const metadata = {
          pagination: {
            offset,
            limit,
            previousOffset: offset - limit < 0 ? null : offset - limit,
            nextOffset: offset + limit,
            currentPage: offset / limit + 1,
            pageCount: Math.ceil(response.count / limit),
            totalCount: response.count
          }
        };

        return res
          .status(StatusCodes.OK)
          .json({ items: response.rows, metadata });
      },
      err => {
        logger.error({ error: err.message }, 'Media List error');
        return next(err);
      }
    );
  }
}

export default new Controller();
