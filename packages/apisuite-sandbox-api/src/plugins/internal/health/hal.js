exports = module.exports = {}

exports.health = {
	prepare: (rep, next) => {
		rep._links = undefined
		next()
	},
}
