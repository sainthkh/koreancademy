function initUser (app) {
	app.get('/', (req, res) => {
		res.render('course/home')
	})
}

module.exports = initUser