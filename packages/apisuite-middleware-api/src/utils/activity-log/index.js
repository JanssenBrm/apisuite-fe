const activitySrvc = require('../../services/activityLog')
const userSrvc = require('../../services/user')
exports = module.exports = { }

exports.log = async (userId, organizations, action,category, message) => {

	if (!organizations) {
		const user = await userSrvc.findUser({id: userId}, {withRelated: ['organizations']})
		organizations = user.related('organizations').toJSON()
		organizations = organizations.map((o) => o.id)
	}

	organizations.map(async (org)=> {
      
		const entry = {
			user_id: userId,
			organization_id: org,
			action: action,
			category: category,
			additional_info: message,
		}
		await activitySrvc.createActivityLog(entry)

	})
}
