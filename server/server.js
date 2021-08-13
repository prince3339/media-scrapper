import Express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import expressPino from 'express-pino-logger';
import cors from 'cors';
import l from './common/logger';
import { routes } from './routes';
import sequelizeModel from './models/index';

const { sequelize } = sequelizeModel;

const expressLogger = expressPino({
  autoLogging: {
    ignorePaths: ['/api/health'],
    getPath: req => {
      if (req.url === '/api/health') {
        return '/api/health';
      }
      return req.url;
    }
  },
  logger: l
});

const app = Express();
app.use(expressLogger);

export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/..`);
    app.set('appPath', `${root}client`);
    app.use(
      bodyParser.json({
        limit: process.env.REQUEST_LIMIT || '100kb'
      })
    );
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb'
      })
    );
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
  }

  // eslint-disable-next-line class-methods-use-this
  async listen(port = process.env.PORT) {
    routes(app);
    app.options('*', cors());

    const welcome = p => () =>
      l.info(
        `up and running in ${
          process.env.ENV || 'development'
        } @: ${os.hostname()} on port: ${p}}`
      );
    const server = http.createServer(app).listen(port, welcome(port));
    try {
      if (process.env.ENV) {
        await sequelize.authenticate();
      }
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
    return server;
  }
}
