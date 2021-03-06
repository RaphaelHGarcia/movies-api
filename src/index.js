import express      from 'express';
import path         from 'path';
import http         from 'http';
import debug        from 'debug';
import logger       from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser   from 'body-parser';
import helmet       from 'helmet';
import cors         from 'cors';
import moment       from 'moment';
import swaggerJSDoc from 'swagger-jsdoc';
import indexRouter  from './api/v1/routes/indexRouter';
import usersRouter  from './api/v1/routes/usersRouter';
import moviesRouter from './api/v1/routes/moviesRouter';
import seriesRouter from './api/v1/routes/seriesRouter';
import seasonsRouter from './api/v1/routes/seasonsRouter';
import episodesRouter from './api/v1/routes/episodesRouter';

debug('api:server');
const app = express();
const port = normalizePort(process.env.PORT || '3000');
const server = http.createServer(app);
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API Movies and TV shows',
      version: '0.0.1',
    },
  },
  apis: [
    './src/api/v1/routes/usersRouter.js',
    './src/api/v1/routes/moviesRouter.js',
    './src/api/v1/routes/seriesRouter.js',
    './src/api/v1/routes/seasonsRouter.js',
    './src/api/v1/routes/episodesRouter.js'
  ]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

// Configuration middlewares
app.set('port', port);
app.use(logger('dev'));
app.use(helmet());
app.use(cors());
app.use(helmet.hidePoweredBy());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set API Routes
app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/movies', moviesRouter);
app.use('/api/v1/series', seriesRouter);
app.use('/api/v1/seasons', seasonsRouter);
app.use('/api/v1/episodes', episodesRouter);

// Set Json API Documentation
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Errors handling requests API
app.use((err, req, res, next) => {
  if(err.status == 400) {
    return res.status(400).jsonp({
      status_code: 400,
      message: err.statusText,
      errors: err.errors
    });
  }
});
app.use((req, res, next) => {
  res.status(404).jsonp({
    status_code: 404,
    message: 'URL not found!'
  })
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(500).jsonp({
    status_code: 500,
    message: 'Internal server error'
  });
});

// Start server
server.listen(port,() => console.log(`Server running in http://localhost:${port}`));
server.on('error', onError);
server.on('listening', onListening);

module.exports = app;
