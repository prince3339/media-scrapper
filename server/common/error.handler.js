import { HttpError } from 'express-openapi-validator/dist/framework/types';
import ErrorResponse from './error.response';

// eslint-disable-next-line no-unused-vars
export default function errorHandler(err, req, res, next) {
  const errorBody = {};

  if (err instanceof ErrorResponse) {
    errorBody.code = err.code;
    errorBody.message = err.message;
    errorBody.timestamp = new Date(new Date().toUTCString());
    errorBody.details = err.details;
  } else if (err instanceof HttpError) {
    errorBody.code = err.name
      ? err.name.replace(' ', '.').toLowerCase()
      : 'unknown.error';
    errorBody.message = err.message;
    errorBody.timestamp = new Date(new Date().toUTCString());
    errorBody.details = [];
    if (err.status === 400) {
      err.errors.forEach(element => {
        const error = {};
        error.code = element.errorCode || 'unknown.error';
        error.path = element.path;
        error.message = element.message;
        errorBody.details.push(error);
      });
    }
  } else {
    errorBody.code = err.code
      ? err.code.toLowerCase()
      : 'internal.server.error';
    errorBody.message = err.message || 'Oops! This is embarrassing.';
    errorBody.timestamp = new Date(new Date().toUTCString());
    errorBody.details = [];
  }
  res.status(err.status || 500).json(errorBody);
}
