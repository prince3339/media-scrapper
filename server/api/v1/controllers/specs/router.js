import * as express from 'express';
import redoc from 'redoc-express';
import controller from './controller';

export default express
  .Router()
  .get(
    '/',
    redoc({
      title: 'API Docs',
      specUrl: 'spec/raw'
    })
  )
  .get('/raw', controller.spec);
