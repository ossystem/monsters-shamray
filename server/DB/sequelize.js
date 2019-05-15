const { db: dbConfig } = require('../config');

module.exports = {
  development: dbConfig,
  test: dbConfig,
  production: dbConfig,
};
