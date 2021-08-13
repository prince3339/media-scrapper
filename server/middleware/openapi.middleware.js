const OpenApiValidator = require('express-openapi-validator');

const openApiMiddleWare = apiSpec => {
  return OpenApiValidator.middleware({
    apiSpec,
    validateRequests: true,
    validateResponses: true,
    validateSecurity: {
      handlers: {
        async basicAuth(req, scopes) {
          const authHeader = req?.headers?.authorization;
          try {
            if (authHeader?.startsWith?.('Basic ')) {
              let isValid = true;
              // TODO
              // Validate auth header
              return Promise.resolve(isValid);
            }
          } catch (err) {
            throw Error(err.message);
          }
          throw Error('Token verification failed!');
        }
      }
    }
  });
};

export default openApiMiddleWare;
