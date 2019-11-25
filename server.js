const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const cors = require('cors')
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

app.set('port', PORT);
app.set('env', NODE_ENV);

app.use(logger('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// frontend
app.use(express.static(path.join(__dirname, 'public')))
// api
app.use('/api/marvel', require(path.join(__dirname, 'api/endpoints.js')));
app.use('/api/images', require(path.join(__dirname, 'api/images.js')));
app.use('/api/docs', require(path.join(__dirname, 'api/docs.js')));

// 404 error
app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} Not Found`);
  err.status = 404;
  next(err);
});

// error message
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

// run
app.listen(PORT, () => {
  console.log(
    `Express Server started on Port ${app.get('port')} | Environment : ${app.get('env')}`
  );
});