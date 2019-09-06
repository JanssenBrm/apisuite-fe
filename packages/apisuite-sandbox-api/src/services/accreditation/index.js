const persistence = require('./persistence')

exports = module.exports = {}

exports.createAccreditation = async (userId, clientId, scopes) => {
	try {
		const accreditation = await persistence.createAccreditation(userId, clientId, scopes)
		return accreditation
	} catch (error) {
		throw error
	}
}
