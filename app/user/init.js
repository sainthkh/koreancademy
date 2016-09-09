const passport = require('passport')

function initUser (app) {
  app.get('/login', renderLogin)
  app.get('/signup', renderSignup)
  app.get('/user/:id', passport.authenticationMiddleware(), renderUserHome)
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }))
}

function renderLogin (req, res) {
  res.render('user/login')
}

function renderSignup (req, res) {
	res.render('user/signup')
}

function renderUserHome (req, res) {
  res.render('user/home', {
    username: req.user.username
  })
}

module.exports = initUser
