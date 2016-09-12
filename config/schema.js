const sqlite3 = require("sqlite3").verbose();
const path = require('path')
const db = new sqlite3.Database(path.join(__dirname, "../assets/data.db"));

db.serialize(function() {
	db.run("create table users("+
		"id int primary_key," +
		"email varchar(255)," +
		"password_hash char(32)," +
		"nickname varchar(30)," +
		"access_level varchar(16)" +
		")")

	db.close()
})