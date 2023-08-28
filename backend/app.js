var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ProgRouter = require('./routes/prog_lang.route');
var OdpRouter = require('./routes/odp_datas.route');
var TeleRouter = require('./routes/tele_bot.route');

var app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/progs', ProgRouter);
app.use('/odp', OdpRouter);
app.use('/botapi', TeleRouter);

module.exports = app;
