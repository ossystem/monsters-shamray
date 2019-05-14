const nodemailer = require('nodemailer');
const emailTemplates = require('email-templates');
const path = require('path');

const templatesDir = path.join(__dirname, '../../views/mailTemplates');

const mailerConfig = {
  transport: {
    host: process.env.MAILER_HOST,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
    port: process.env.MAILER_PORT,
    secure: true,
    tls: {
      rejectUnauthorized: false,
    },
  },
  from: process.env.MAILER_FROM,
};

const transport = nodemailer.createTransport(mailerConfig);

const MESSAGE_FROM = `Found your monster <${mailerConfig.from}>`;

module.exports = {
  renderer: null,

  init() {
    const self = this;

    transport.verify(error => {
      if (error) {
        console.log('Mailer error:', error);
      } else {
        console.log('Mailer is working');
      }
    });

    if (this.renderer) return Promise.resolve();

    return new Promise((resolve, reject) => {
      emailTemplates(templatesDir, (err, renderer) => {
        if (err) return reject(err);
        self.renderer = renderer;
        return resolve();
      });
    });
  },

  render(tplName, data) {
    const self = this;
    return new Promise((resolve, rej) => {
      self.renderer(tplName, data, (err, html, text) => {
        if (err) return rej(err);
        resolve({ html, text });
      });
    });
  },

  sendMail(from, to, subject, text, html, attachments) {
    const params = {
      from,
      to,
      subject,
      text,
    };

    if (html) params.html = html;
    if (attachments && Array.isArray(attachments)) {
      params.attachments = attachments;
    }

    return new Promise((resolve, reject) => {
      transport.sendMail(params, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  },

  sendMailTemplate(to, subject, tplName, data, attachments) {
    const self = this;

    return this.render(tplName, data).then(result =>
      self.sendMail(
        MESSAGE_FROM,
        to,
        subject,
        result.text,
        result.html,
        attachments,
      ),
    );
  },
};
