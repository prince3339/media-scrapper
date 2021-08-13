const OpenApiValidator = require('express-openapi-validator');

const basicAuthUsername = process.env.USERNAME;
const basicAuthPassword = process.env.PASSWORD;

const openApiMiddleWare = apiSpec =>
  OpenApiValidator.middleware({
    apiSpec,
    validateRequests: true,
    validateResponses: true,
    validateSecurity: {
      handlers: {
        async basicAuth(req) {
          const authHeader = req?.headers?.authorization;
          try {
            if (authHeader?.startsWith?.('Basic ')) {
              const base64Credentials = req.headers.authorization.split(' ')[1];
              const credentials = Buffer.from(
                base64Credentials,
                'base64'
              ).toString('ascii');
              const [username, password] = credentials.split(':');

              const isValid = !!(
                username === basicAuthUsername && password === basicAuthPassword
              );

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

export default openApiMiddleWare;
