var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose'); // Import Mongoose
var cors = require('cors');
var indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/files');

var app = express();

const dbEnv = require("./config").get(process.env.NODE_ENV);
const url = dbEnv.DATABASE+'nujan-db'+dbEnv.DATABASE_SUFFIX;
const url2 = 'mongodb+srv://admin:0ohTiFDfaWNnGxnN@cluster0.gu9wqmy.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
// mongoose.connect(url, { useNewUrlParser: true });
mongoose.connect(url2, {useNewUrlParser: true});

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.once('open', _ => {
  console.log('Database connected:', url);
});

db.on('error', err => {
  console.error('connection error:', err);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

var corsOptions = {
    origin: 'http://localhost:3000',
}

app.use(allowCrossDomain);
// app.use(cors(corsOptions));

var apiPrefix = '/api/v1';

app.use(apiPrefix + '/', indexRouter);
app.use(apiPrefix + '/users', usersRouter);
app.use(apiPrefix + '/admin', adminRouter);

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
