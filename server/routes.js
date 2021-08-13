import * as path from 'path';
import specsV1Router from './api/v1/controllers/specs/router';
import mediaV1Router from './api/v1/controllers/media/router';

function routesV1(app) {
  app.use('/api/v1/spec', specsV1Router);
  app.use('/api/v1/media', mediaV1Router);
}

function routesv(app, v) {
  // common routes
  if (v === 1) routesV1(app);
}

export function routes(app) {
  const versions = [1];
  versions.forEach(v => {
    const apiSpec = path.join(__dirname, '/common/', `api.v${v}.yml`);
    routesv(app, v);
  });
}
