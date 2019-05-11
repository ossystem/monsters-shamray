/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require('express-jwt');
//const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const logger = require('./logger');
const initDB = require('./boot/mySQL');
const initRouters = require('./routes');
require('dotenv').config();

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');

const pid = process.pid;

process
  .on('SIGINT', () => {
    console.log(`Process ${pid} stopped manually`);
    process.exit(0);
    //db.closeConnection();
    /*server.close(() => {
      process.exit(0);
    });*/
  })
  .on('SIGTERM', () => {
    console.log(`Process ${pid} stopped`);
    process.exit(0);
    //db.closeConnection();
    /*server.close(() => {
      process.exit(0);
    });*/
  })
  .on('unhandledRejection', error => {
    logger.error(`${__filename}: Unhandled rejection: ${error}. Pid: ${pid}`);
    console.error('unhandledRejection: ', error);
    // db.closeConnection();
    // process.exit(1);
  })
  .on('uncaughtException', error => {
    logger.error(`${__filename}: Uncaught exception: ${error}. Pid: ${pid}`);
    console.error('uncaughtException: ', error);
    // db.closeConnection();
    // process.exit(1);
  });


const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const app = express();

app.use(cors());

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  }),
);

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});

//const checkScopes = jwtAuthz([ 'read:messages' ]);
//const checkScopesAdmin = jwtAuthz([ 'write:messages' ]);

initDB();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);
initRouters(app, { checkJwt });

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
