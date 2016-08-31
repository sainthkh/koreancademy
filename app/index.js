var express = require('express');

var http = require('http');
var path = require('path');

const exphbs = require('express-handlebars')

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({
  defaultLayout: 'layout',
  extname: '.hbs',
  layoutsDir: path.join(__dirname),
  partialsDir: path.join(__dirname)
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname))

require('./course').init(app)
require('./admin').init(app)

module.exports = app