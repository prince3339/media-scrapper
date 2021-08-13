const { parse } = require('pg-connection-string');

const config = parse(process.env.DB_URL);
const { host, user: username, password, database } = config;

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
  },
  test: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
  },
  staging: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
  },
  production: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
  }
};
