const passport = require('passport')
const async = require('async')
const fs = require('fs')
const path = require('path')

function initUser (app) {
	app.get('/login', renderLogin)
	app.post('/login', postLogin)

	app.get('/signup', renderSignup)
	app.post('/signup', postSignup)
	
	app.get('/user/:id', passport.authenticationMiddleware(), renderUserHome)
	app.post('/login', passport.authenticate('local', {
		successRedirect: '/profile',
		failureRedirect: '/'
	}))
}

function renderLogin (req, res) {
	res.render('user/login')
}

function postLogin(req, res) {
	const db = require('../database')
	async.parallel([
		function(callback) {
			db.serialize(function(){
				const model = require('./model')
				model.get_by_email(req.body.email, function(err, user){
					if (user) {
						if(model.password_hash(req.body.password) == user.password_hash) {
							callback()
						} else {
							callback("wrong password")
						}
					} else {
						callback("no account")
					}
				})
			})
		}
	],
	function(err, results) {
		if (!err) {
			if (!req.redirect) {
				req.redirect = '/'
			}
			res.redirect(req.redirect)
		} else {
			res.render('user/login', {
				email: req.body.email,

				error: err == "no account" || err == "wrong password"
			})
		}
	})
}

function renderSignup (req, res) {
	res.render('user/signup')
}

function postSignup(req, res) {
	const db = require('../database')
	async.parallel([
		function(callback) {
			db.serialize(function(){
				db.get("select id from users where email=?", req.body.email, function(err, row){
					if (!row) {
						callback()
					} else {
						callback(null, "already signup")
					}
				})
			})
		},
		function(callback) {
			if (req.body.password.length >= 8) {
				callback()
			} else {
				callback(null, "pw too short")
			}
		},
		function(callback) {
			fs.readFile(path.join(__dirname, '10k_most_common_8char.txt'), function(err, data){
				if (err) callback(err)
				var passwords = data.toString().split("\n")

				if(passwords.indexOf(req.body.password) == -1) {
					callback()
				} else {
					callback(null, "common password")
				}
			})
		}
	],
	function(err, results){
		function passAll(results) {
			for(var i = 0; i < results.length; i++){
				if (results[i]) return false
			}
			return true
		}

		if (passAll(results)) {
			const model = require('./model')
			model.add(req.body.email, req.body.password, req.body.username)
			res.redirect("/activate-your-account")
		} else {
			res.render('user/signup', {
				email: req.body.email,
				username: req.body.username,

				signup: (results.indexOf("already signup") > -1),
				pwlength: (results.indexOf("pw too short") > -1),
				common_pw: (results.indexOf("common password") > -1)
			})
		}
	})
}

function renderUserHome (req, res) {
	res.render('user/home', {
		username: req.user.username
	})
}

module.exports = initUser
