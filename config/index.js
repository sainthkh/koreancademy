const config = {}

config.redisStore = {
  url: '//localhost:6379',
  secret: 'test value'
}

config.user = {
  password_secret: '1234'
}

module.exports = config
