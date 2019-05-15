const Sequelize = require('sequelize');
const sequelizeHierarchy = require('sequelize-hierarchy');
const { db: index } = require('../config');

let connection;

const getConnection = () => {
  if (connection) {
    return connection;
  } else {
    connect();
    return connection;
  }
}

const connect = () => {
  if (!connection) {
    sequelizeHierarchy(Sequelize);

    try {
      connection = new Sequelize(
        index.database,
        index.username,
        index.password,
        index
      );
    } catch (ex) {
      console.error(ex.message);
      process.exit(-1);
    }
  }

  return connection;
};

const closeConnection = () => {
  if (connection && (typeof connection.close === 'function')) {
    try {
      connection.close();
      connection = null;
    } catch (ex) {
      console.error(ex.message);
    }
  }
};

const describeSeeder = (tableName, data = []) => {
  return {
    up: queryInterface => queryInterface.bulkInsert(tableName, data, {}),
    down: queryInterface => queryInterface.bulkDelete(tableName, null),
  };
};

module.exports = {
  connect,
  getConnection,
  closeConnection,
  describeSeeder,
};
