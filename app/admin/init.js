function initUser (app) {
	app.get('/admin', (req, res) => {
		res.render('admin/write')
	})
}

module.exports = initUser