const db = require('../database')
const config = require('../../config')
const md5 = require('js-md5')

var m = {}

m.get_by_id = function(id, callback) {
	var user = {}
	db.serialize(function(){
		db.get("select * from users where id=(?)", id, function(err, row){
			callback(err, row)
		})
	})
}

m.add = function(email, password, nickname) {
	db.serialize(function() {
		var stmt = db.prepare('insert into users(email, password_hash, nickname, access_level) values (?,?,?,?)')

		stmt.run(email, m.password_hash(password), nickname, 'non-active')
	})
}

m.password_hash = function(password) {
	return md5(config.user.secret + password)
}

module.exports = m