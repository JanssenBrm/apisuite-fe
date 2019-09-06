const config = require('../src/config')
const cryptoUtils = require('../src/utils/crypto')
const user2faSrvc = require('../src/services/user2fa')

exports.up = (knex) => {
	return knex('user')
		.select('user.id')
		.innerJoin('user_scope', 'user_scope.user_id', 'user.id')
		.innerJoin('scope', 'scope.id', 'user_scope.scope_id')
		.where('scope.name', '=', 'admin')
		.limit(1)
		.then((res) => {
			const userId = res[0].id
			const totpKey = config.get('twoFactor').totp_encryption_key
			const userSecret = user2faSrvc.generate2FASecret('base32')
			const secret = cryptoUtils.encrypt(totpKey, userSecret)

			return knex('user_two_fa')
				.insert({
					user_id: userId,
					secret,
					method: 'authorizationSms',
				})
		})
}

exports.down = () => { return new Promise((resolve) => resolve()) }
