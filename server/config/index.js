const { DB_HOST, DB_USER, DB_PASS, DB_DATABASE } = process.env;

module.exports = {
  db: {
    dialect: 'mysql',
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASS,
    database: DB_DATABASE,
    logging: false,
    timeout: 30 * 1000,  // ms
    timezone: '+00:00',
    define: {
      dialectOptions: {
        collate: 'utf8mb4_general_ci',
        useUTC: true
      },
      charset: 'utf8mb4',  // this charset is required for storing any special chars in DB
      underscored: false,
      timestamps: false,
      paranoid: false
    },
    sync: {
      force: true,
    },
    pool: {
      max: 50,  // maximum opened active connections to DB
      idle: 30000  // after this time an inactive connection will be closed, ms
    }
  },
};
