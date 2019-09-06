exports = module.exports = {}

exports.set = (request, key, value) => {
	request.yar.set(key, value)
}

exports.get = (request, key) => {
	return request.yar.get(key)
}
