const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const indexRouter = require('./indexRouter');
const usersRouter = require('./users/usersRouter');
const tasksRouter = require('./tasks/tasksRouter');
const cors = require('cors');

let app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.set('view engine', 'html');

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

// //extract user_id
// const extractUserId = (req, res, next) => {
//   req.body.user_id = req.params.user_id;
//   next();
// }
// // app.use('/api/users/:user_id/tasks', extractUserId, tasksRouter);
app.use("/api/tasks",tasksRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler no stacktraces leaked to user unless in development environment
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development')
      ? err
      : {}
  });
});

module.exports = app;
