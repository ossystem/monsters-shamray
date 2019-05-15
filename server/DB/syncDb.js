const models = require('../models');

models.sequelize
  .sync({ force: true })
  .catch(ex => console.error(ex))
  .finally(() => {
    process.exit();
  });
