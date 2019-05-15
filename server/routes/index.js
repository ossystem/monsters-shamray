const { API_URL } = require('../../constants');
const mailer = require('../services/mailer');
const determineTypeOfMonster = require('../services/determineTypeOfMonster');
const questionerConfig = require('../data/questionerConfig');
const models = require('../models');

module.exports = function(app, middlewares) {
  const { checkJwt } = middlewares;

  app.get(`${API_URL}/questionerConfig`, checkJwt, async (req, res) => {
    const data = questionerConfig;
    res.json({ data });
  });

  app.post(`${API_URL}/saveAnswers`, checkJwt, async (req, res, next) => {
    try {
      const answers = req.body;
      const typeOfMonster = determineTypeOfMonster(questionerConfig, answers);

      const sendOnEmail = async () => {
        try {
          const addresse = process.env.ADDRESSE_EMAIL;
          if (!addresse) {
            throw new Error(
              'addresse email is not specified, please set ADDRESSE_EMAIL env var',
            );
          }
          await mailer.init();
          const subject = 'Found your monster: Your result';
          const mailTemplate = 'result';
          const data = { typeOfMonster };
          await mailer.sendMailTemplate(addresse, subject, mailTemplate, data);
          console.log('sendOnEmail succsess');
        } catch (error) {
          console.log(`sendOnEmail error: ${error}`);
        }
      }
      sendOnEmail();

      const subject = req.user.sub;

      const { version: questionerVersion } = questionerConfig;

      const lastAttemptRecord = await models.answers.findOne({
        attributes: ['attempt'],
        where: { subject, questionerVersion },
        order: [['attempt', 'DESC']],
      });
      const attempt = lastAttemptRecord ? lastAttemptRecord.attempt + 1 : 1;

      const answersRecords = [];
      answers.forEach((answer, index) => {
        const record = {
          subject,
          questionerVersion,
          attempt,
          question: index,
          value: JSON.stringify(answer),
        };
        answersRecords.push(record);
      });

      await models.answers.bulkCreate(answersRecords);

      res.json({ data: answers });
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
