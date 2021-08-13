import * as path from 'path';
import healthRouter from './common/health/router';
import specsV1Router from './api/v1/controllers/specs/router';
import mediaV1Router from './api/v1/controllers/media/router';
import openApiMiddleWare from './middleware/openapi.middleware';
import errorHandler from './common/error.handler';

function routesV1(app) {
  app.use('/api/v1/spec', specsV1Router);
  app.use('/api/v1/media', mediaV1Router);
  app.use(errorHandler);
}

function routesv(app, v) {
  // common routes
  app.use('/api/health', healthRouter);

  if (v === 1) routesV1(app);
}

export function routes(app) {
  const versions = [1];
  versions.forEach(v => {
    const apiSpec = path.join(__dirname, '/common/', `api.v${v}.yml`);
    app.use(openApiMiddleWare(apiSpec));
    routesv(app, v);
  });
}
