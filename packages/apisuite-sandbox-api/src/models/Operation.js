const BaseModel = require('./BaseModel')

/**
 * Operation model
 */
class Operation extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String}			- table name
	 */
	get tableName() { return 'operation' }

	/**
 	 * Model Serializer
	 * @returns	{Object}	- Serialized Model
 	 */
	serialize() {
		return {
			operation: this.get('operation'),
		}
	}
}

module.exports = Operation
