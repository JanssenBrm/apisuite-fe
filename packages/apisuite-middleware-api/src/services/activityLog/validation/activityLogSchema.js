const Joi = require('joi')
const ActivityLog = require('../../../models/ActivityLog')

const possibleActions = ActivityLog.actions()

const schema = Joi.object().keys({
	user_id: Joi.number().integer().required(),
	organization_id: Joi.number().integer().required(),
	action: Joi.string().valid(possibleActions).required(),
	category: Joi.string().required(),
	additional_info: Joi.string(),   
})

/**
 * 
 * @param {Object} entry - activity log entry
 * @returns {Object} - 
 */
function validate(entry) {
	return Joi.validate(entry, schema)
} 

module.exports.validate = validate
