const db = require('../database.js')

var m = {}

m.get_user_by_id = function(id, callback) {
	var user = {}
	db.serialize(function(){
		db.get("select * from users where id=(?)", id, function(err, row){
			callback(err, row)
		})
	})
}

m.add_new_user = function(email, pw_hash, nickname) {
	db.serialize(function() {
		var stmt = db.prepare('insert into users(email, password_hash, nickname, access_level) values (?,?,?,?)')

		stmt.run(email, pw_hash, nickname, 'free')
	})
}

module.exports = m