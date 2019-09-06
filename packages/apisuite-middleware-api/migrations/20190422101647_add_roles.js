exports.up = function (knex) {
	const res = Promise.all([
		knex('role')
			.insert({
				name: 'ADMIN',
				level: 0,
			}),
		knex('role')
			.insert({
				name: 'DEVELOPER',
				level: 1,
			}),
		knex('role')
			.insert({
				name: 'TESTER',
				level: 2,
			}),
		knex('role')
			.insert({
				name: 'SALES',
				level: 3,
			}),
	])
	
	return res
}

exports.down = function (knex) {
	return knex('role')
		.del()
}
