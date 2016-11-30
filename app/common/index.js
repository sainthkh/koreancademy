export const Auth = require('./auth')
export const Database = require('./database')

export function init(app) {
	Auth.init(app)
}