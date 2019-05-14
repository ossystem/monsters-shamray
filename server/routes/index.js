const { API_URL } = require('../../constants');
const mailer = require('../services/mailer');

module.exports = function(app, middlewares) {
  const { checkJwt } = middlewares;
  app.get(`${API_URL}/save`, checkJwt, async (req, res, next) => {
    try {
      await mailer.init();
      const addresse = 'okeanrst@gmail.com';
      const subject = 'Found your monster: Your result';
      const mailTemplate = 'result';
      const data = {};
      await mailer.sendMailTemplate(addresse, subject, mailTemplate, data);

      res.json({message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'});
    } catch (e) {
      next(e);
    }
  });

  //api 404
  app.use(`${API_URL}/*`, (req, res) => {
    console.log('404 error');
    res.status(404);
    res.json({ error: '404 error' });
  });

  app.use(`${API_URL}/*`, (err, req, res, next) => {
    if (err) {
      const message = err.message || 'Server error';
      if (process.env.NODE_ENV === 'development') {
        console.log('routes:', err);
      }

      res.status(err.status || 500);

      res.json({ error: message });
    } else {
      next();
    }
  });
};
