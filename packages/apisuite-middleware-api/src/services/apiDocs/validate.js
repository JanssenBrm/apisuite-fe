const parser = require('swagger-parser')

exports = module.exports = { }

exports.validate = (doc) => {
	return parser.validate(doc)
}
