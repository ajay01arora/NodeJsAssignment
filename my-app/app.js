const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const mongoose=require('mongoose')

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const OpeningRouter = require('./routes/openingList');
const CreateOrUpdateRouter = require('./routes/createOrUpdateOpening');
const auth = require('./middleware/auth');

require('./config/passport');


const app = express();

const db = require('./databases/db');
db.connectToDb("mongodb+srv://test:test123@cluster0-d4nax.mongodb.net/testing?retryWrites=true&w=majority");



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const publicDirectoryPath = path.join(__dirname, 'public')
app.use('/static', express.static(publicDirectoryPath))

// app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: 'userdata',
  resave: false,
  saveUninitialized: false,
  secret: 'my_secret',
  cookie: {
      maxAge: 1000 * 60 * 60 * 24, // one day 24 hours
      sameSite: true,
      secure: false,
  }
}))

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/openingList', OpeningRouter);
app.use('/createOrUpdate', CreateOrUpdateRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
