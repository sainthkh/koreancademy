const express = require('express');
const bodyparser = require('body-parser')
const path = require('path');
const exphbs = require('express-handlebars')
const hbsHelpers = require('handlebars-helpers')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const config = require('../config')
const app = express();

app.use(express.static('static'))
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.set('port', process.env.PORT || 3000);

require('./auth').init(app)

app.use(session({
  store: new RedisStore({
    url: config.redisStore.url
  }),
  secret: config.redisStore.secret,
  resave: false,
  saveUninitialized: false
}))

var hbs = exphbs.create({
  defaultLayout: 'layout',
  extname: '.hbs',
  layoutsDir: path.join(__dirname),
  partialsDir: path.join(__dirname)
})
hbs.helpers = hbsHelpers({hbs:hbs.handlebars}) 

app.engine('.hbs', hbs.engine)

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname))

require('./course').init(app)
require('./admin').init(app)
require('./user').init(app)

module.exports = app