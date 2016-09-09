const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const config = require('../config')
const app = express();

app.use(express.static('assets'))

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

require('./auth').init(app)

app.use(session({
  store: new RedisStore({
    url: config.redisStore.url
  }),
  secret: config.redisStore.secret,
  resave: false,
  saveUninitialized: false
}))

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
require('./user').init(app)

module.exports = app