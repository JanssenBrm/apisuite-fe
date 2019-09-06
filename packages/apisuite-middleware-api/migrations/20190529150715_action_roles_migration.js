exports.up = async function (knex) {
	
	const adminRoleId = await knex.select('id')
		.from('role')
		.where({'name': 'ADMIN'})
    
	const developerRoleId = await knex.select('id')
		.from('role')
		.where({'name': 'DEVELOPER'})
	
	const testerRoleId = await knex.select('id')
		.from('role')
		.where({'name': 'TESTER'})

	const actions = [
		'USER_CREATION',
		'USER_UPDATE',
		'USER_LOGIN',
		'APP_CREATION',
		'APP_UPDATE',
		'APP_DELETE',
		'APP_SUBSCRIPTION',
		'APP_AUTHORIZATION',
		'APP_REVOKE',
		'TEST_USER_CREATION',
		'TEST_USER_UPDATE',
		'TEST_USER_DELETE',
		'TEST_USER_LOGIN',
		'TEST_USER_LOGOUT',
	]

	const adminPromises = actions.map(a => {
		return knex('action_role')
			.insert({action: a, role_id: adminRoleId[0].id})
	})

	const developerPromises = actions.slice(-10).map(a => {
		return knex('action_role')
			.insert({action: a, role_id: developerRoleId[0].id})
	})

	const testerPromises = actions.slice(-8).map(a => {
		return knex('action_role')
			.insert({action: a, role_id: testerRoleId[0].id})
	})

	const promises = [
		...adminPromises,
		...developerPromises,
		...testerPromises,
	]

	return Promise.all(promises)

}

exports.down = function (knex) {
	return knex('action_role').del()
}
