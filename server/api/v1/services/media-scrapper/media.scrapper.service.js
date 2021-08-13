import logger from 'server/common/logger';
import ErrorResponse from 'server/common/error.response';
import { StatusCodes } from 'http-status-codes';
import Cheerio from 'cheerio';
import axios from 'axios';
import models from 'server/models';

const { Media } = models;

class MediaScrapperService {
  async scrapeMedia(req) {
    logger.info(`${this.constructor.name}.scrapeMedia()`);
    try {
      const { urls } = req.body;
      const promises = [];
      const mediaData = [];
      urls.forEach(async url => {
        promises.push(axios.get(url));
      });

      const contents = await Promise.all(promises);
      contents.forEach((content, index) => {
        const $ = Cheerio.load(content.data);
        $('img').each((mediaIndex, image) => {
          const media = {
            title: $(image).attr('alt'),
            mediaUrl: $(image).attr('src'),
            webUrl: urls[index],
            type: 'IMAGE'
          };
          mediaData.push(media);
          console.log(media);
        });
      });

      await Media.bulkCreate(mediaData, {
        returning: true
      });

      return Promise.resolve(mediaData);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export default new MediaScrapperService();
