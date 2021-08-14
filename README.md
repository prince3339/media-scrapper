# Media-Scrapper-Service

NodeJS scrapper to sca=rape image and video source urls

- well organized folder structure
- req/res logging using pino and express-pino-logger
  - see server.js
- Structured logging at different log levels
  - see logger.js
- Render beautiful OpenAPI spec using ReDoc
  - Try /api/v1/spec endpoint

## Get Started

Get started developing...

```shell
# install deps
npm install

# run in development mode
npm run dev

# run tests
npm run test
```

## Add environment variabls

Create a .env file and paste and edit the bellow variables as per the Backaned requirements

```bash
ENV=development
PORT=4000
REQUEST_LIMIT=100kb

# Database
# Local DB
DB_URL=postgresql://username:password@localhost:5432/Momos
DB_SCHEMA=boilerplate
DB_DIALECT=postgres

#Basic Auth
USERNAME=Sabbir
PASSWORD=Sabbir

ALLOWED_ORIGINS=http://localhost:3000

```

## Install Dependencies

Install all package dependencies (one time operation)

```shell
npm install
```

## Run It

#### Run in _development_ mode:

Runs the application is development mode. Should not be used in production

```shell
npm run dev
```

or debug it

```shell
npm run dev:debug
```

#### Run in _production_ mode:

Compiles the application and starts it in production production mode.

```shell
npm run compile
npm start
```

## Test It

Run the Mocha unit tests

```shell
npm test
```

or debug them

```shell
npm run test:debug
```

## Try It

- Open you're browser to [http://localhost:3000](http://localhost:3000)
- Invoke the `/examples` endpoint
  ```shell
  curl http://localhost:3000/api/v1/examples
  ```

## Debug It

#### Debug the server:

```
npm run dev:debug
```

#### Debug Tests

```
npm run test:debug
```

#### Debug with VSCode

Add these [contents](https://github.com/cdimascio/generator-express-no-stress/blob/next/assets/.vscode/launch.json) to your `.vscode/launch.json` file

## Lint It

View prettier linter output

```
npm run lint
```

Fix all prettier linter errors

```
npm run lint
```
