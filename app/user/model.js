const sqlite3 = require("sqlite3").verbose();
const path = require('path')
const db = new sqlite3.Database(path.join(__dirname, "../assets/data.db"));

var m = {}

m.get_user_by_id = function(id) {
	var user = {}
	db.serialize(function(){
		db.get("select * from users where id=(?)", id, function(err, row){
			user = row
		})
	})

	return user
}

m.add_new_user = function(email, pw_hash, nickname) {
	db.serialize(function() {
		var stmt = db.prepare('insert into users(email, password_hash, nickname, access_level) values (?,?,?,?)')

		stmt.run(email, pw_hash, nickname, 'free')
	})
}