export default class ErrorResponse extends Error {
  constructor(status, code, message, details) {
    super(message || '');
    this.status = status || 500;
    this.code = code || 'unknown.error';
    this.message = message || '';
    this.details = details || [];

    Error.captureStackTrace(this, this.constructor);
  }
}
