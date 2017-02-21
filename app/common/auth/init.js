const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const authenticationMiddleware = require('./middleware')

export function init(app) {
	app.use(passport.initialize());
	app.use(passport.session());
} 

export function ensureAuth(req, res, next) {
	if (req.isAuthenticated()) {
		return next()
	}
	res.redirect('/login')
}

function findUser (username, callback) {
	if (username === user.username) {
		return callback(null, user)
	}
	return callback(null)
}

passport.serializeUser(function (user, cb) {
	cb(null, user.username)
})

passport.deserializeUser(function (username, cb) {
	findUser(username, cb)
})


passport.use(new LocalStrategy(
function(username, password, done) {
findUser(username, function (err, user) {
if (err) {
return done(err)
}
if (!user) {
return done(null, false)
}
if (password !== user.password  ) {
return done(null, false)
}
return done(null, user)
})
}
))
passport.authenticationMiddleware = authenticationMiddleware
