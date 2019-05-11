const { API_URL } = require('../../constants');

module.exports = function(app, middlewares) {
  const { checkJwt } = middlewares;
  app.get(API_URL, checkJwt, function(req, res) {
    res.json({message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'});
  });
};
