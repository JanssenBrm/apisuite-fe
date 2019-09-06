exports.up = async function (knex) {
	
	const adminRoleId = await knex.select('id')
		.from('role')
		.where({'name': 'ADMIN'})

	const users = await knex.select('id', 'user_id', 'organization_id')
		.from('user_organization')

	const promises = users.map(r => {
		return knex('user_organization_role')
			.insert({
				user_id: r.user_id,
				organization_id: r.organization_id,
				role_id: adminRoleId[0].id,
			})
	})

	return Promise.all(promises)

}

exports.down = function (knex) {
	return knex('user_organization_role').del()
}
