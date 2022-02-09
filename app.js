var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mainLogics = require('./modules/index');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
  res.render('pages/home');
});

app.get('/adduser', function(req, res) {
  res.render('pages/addperson');
});

app.get('/success', function(req, res) {
  res.render('pages/success');
});

app.get('/error', function(req, res) {
  res.render('error');
});

app.get('/connectpartner', function(req, res) {
  res.render('pages/connectpartner');
});

app.get('/connectparents', function(req, res) {
  res.render('pages/connectparents');
});

 app.get('/firstlevel', function(req, res){
   res.render('pages/firstlevel');
 });

app.get('/resultfirstlevel', mainLogics.firstLevel);

app.get('/shortestpath', function(req, res){
  res.render('pages/shortestpath');
});

app.get('/resultshortestpath', mainLogics.shortestPath);

//Iishee zugleed yhavde...
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;