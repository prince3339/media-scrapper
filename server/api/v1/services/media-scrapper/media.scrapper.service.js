import logger from 'server/common/logger';
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
        promises.push(
          axios.get(url, { headers: { 'Content-Type': 'text/html' } })
        );
      });

      const contents = await Promise.all(promises);
      contents.forEach((content, index) => {
        const $ = Cheerio.load(content.data);
        $('img').each((_, image) => {
          const media = {
            title: $(image).attr('alt') || $(image).attr('src'),
            mediaUrl: $(image).attr('src'),
            webUrl: urls[index],
            type: 'IMAGE'
          };
          if ($(image).attr('src')) {
            mediaData.push(media);
          }
        });
        $('video').each((_, video) => {
          const media = {
            title: $(video).attr('src') || video.children[0]?.attr?.('src'),
            mediaUrl: $(video).attr('src') || video.children[0]?.attr?.('src'),
            webUrl: urls[index],
            type: 'VIDEO'
          };
          if ($(video).attr('src') || video.children[0]?.attr?.('src')) {
            mediaData.push(media);
          }
        });
      });

      if (mediaData.length) {
        await Media.bulkCreate(mediaData, {
          returning: true
        });
      }

      return Promise.resolve(mediaData);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export default new MediaScrapperService();
