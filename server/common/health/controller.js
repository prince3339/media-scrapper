import { StatusCodes } from 'http-status-codes';
import healthService from './service';

export class Controller {
  async checkHealth(req, res) {
    try {
      const response = await healthService.checkHealth();
      if (response.services.length) {
        res.status(StatusCodes.SERVICE_UNAVAILABLE).json(response);
      } else {
        res.sendStatus(StatusCodes.NO_CONTENT);
      }
    } catch (err) {
      res.sendStatus(StatusCodes.SERVICE_UNAVAILABLE);
    }
  }
}
export default new Controller();
