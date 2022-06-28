var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require("jsonwebtoken");

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


let auth = function(req, res, next){
  try {
    jwt.verify(req.cookies.token, "secret", function(err, decoded){
      if(err) res.redirect("/login")
      else if(decoded) next();
    })
  } catch(e){
    res.redirect("/login");
  }
}

app.get('/', auth, function(req, res) {
  res.render('pages/home');
});

app.get('/adduser', auth, function(req, res) {
  res.render('pages/addperson');
});

app.get('/success', auth, function(req, res) {
  res.render('pages/success');
});

app.get('/error', auth, function(req, res) {
  res.render('error');
});

app.get('/connectpartner', auth, function(req, res) {
  res.render('pages/connectpartner');
});

app.get('/connectparents', auth, function(req, res) {
  res.render('pages/connectparents');
});

 app.get('/firstlevel', auth, function(req, res){
   res.render('pages/firstlevel');
 });

 app.get('/firstlevelV2', auth, function(req, res){
  res.render('pages/firstlevelV2');
});

app.get('/firstlevelV3', auth, function(req, res){
  res.render('pages/firstlevelV3');
});

app.get('/resultfirstlevel', auth, mainLogics.firstLevel);

app.get('/resultfirstlevelV2', auth, mainLogics.firstLevelV2);

app.get('/resultfirstlevelV3', auth, mainLogics.firstLevelVV2);

app.get('/shortestpath', auth, function(req, res){
  res.render('pages/shortestpath');
});

app.get('/resultshortestpath', auth, mainLogics.shortestPath);

app.get('/searchperson', auth, function(req, res){
  res.render('pages/searchperson');
});

app.get('/resultsearchperson', auth, mainLogics.searchPerson);

app.get('/login', function(req, res){
  res.render('pages/login');
});


app.post("/login", function(req, res){
  req.app.get('db').collection("user").findOne({...req.body}, function(err, user){
    if(err) res.redirect("/login");
    else if(!user) res.redirect("/login");
    else {
      let token = jwt.sign({ _id: user._id }, 'secret');
      res.cookie('token', token);
      res.redirect('/');
    }
  })
})

app.get('/register', function(req, res){
  res.render('pages/register');
});

app.post("/register", function(req, res){
  req.app.get('db').collection("user").insertOne({
    ...req.body
  }, function(err){
    res.redirect("/login")
  })
})

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