const express = require('express');
const bodyparser = require('body-parser')
const path = require('path');
const exphbs = require('express-handlebars')
import { FrontEnd } from './frontend';

const config = require('../config')
const app = express();

app.use(express.static('static'))
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.set('port', process.env.PORT || 3000);

var hbs = exphbs.create({
  extname: '.hbs',
  layoutsDir: path.join(__dirname),
  partialsDir: path.join(__dirname)
}) 

app.engine('.hbs', hbs.engine)

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname))

app.use('/', FrontEnd)

module.exports = app