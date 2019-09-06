const logger = require('../../../utils/logger')
const Boom = require('boom')

const internals = { }
let allRoles = ['ADMIN', 'DEVELOPER', 'TESTER', 'SALES']

internals.validateRoles = (request, h) => {

	if (!request.route.settings.plugins['openbank-rbac']) {
		return h.continue
	}

	if (!request.auth.credentials) {
		logger.error('RBAC requires an authenticated user')

		throw Boom.forbidden('RBAC requires an authenticated user')
	}
	
	const routeRbac = request.route.settings.plugins['openbank-rbac']
	
	
	if (routeRbac) {

		allRoles = allRoles.map(a => a.toLowerCase())
	
		const organizationId = request.params.orgId || request.params.organizationId || -1
		
			
		const userRoles = request.auth.credentials.roles ? request.auth.credentials.roles : []
		
		if (userRoles.length === 0) 
			throw Boom.forbidden('User has no roles and this routes requires elevated access level')

		
		const userOrganizationRoles = userRoles.reduce((result, elem) => {
			
			// User has no roles. Does not throw here. Instead, it throws on the next check.
			if (!elem || !elem.role) return result

			if (elem.organizationId.toString() === organizationId.toString()) result.push(elem.role.toLowerCase())
			if(elem.isGlobal) result.push(elem.role.toLowerCase())

			return result
		}, [])


		if (userOrganizationRoles.length === 0)
			throw Boom.forbidden('User has no roles and this routes requires elevated access level for this organization')

		if (userOrganizationRoles.indexOf('admin') >= 0) return h.continue

		let target  = [...routeRbac.roles]
		
		target = target.map(t => t.toLowerCase())


		if (routeRbac.mode === 'exactly') {
			if(!target.every(elem => userOrganizationRoles.indexOf(elem) >= 0)) {
				logger.error('User does not have the required roles to access this route')
				throw Boom.forbidden('User does not have sufficient access level to use this route')
			}
		}

		if(routeRbac.mode === 'oneOf') {
			if(!target.some(elem => userOrganizationRoles.indexOf(elem) >= 0)) {
				logger.error('User does not have the required roles to access this route')
				throw Boom.forbidden('User does not have sufficient access level to use this route')
			}
		}

		if(routeRbac.mode === 'hierarchy') {
			const highest = userOrganizationRoles[0]
			const virtualUserRoles = allRoles.slice(allRoles.indexOf(highest))
			
			if(!target.some(elem => virtualUserRoles.indexOf(elem) >= 0)) {
				logger.error('User does not have the required roles to access this route')
				throw Boom.forbidden('User does not have sufficient access level to use this route')
			}
		}

	}

	return h.continue
}



const plugin = {
	name: 'openbank-rbac',
	version: '1.0.0',
	multiple: false,
	register: (server) => {
		
		// Testing purpose. Replace onPreAuth with onPostAuth
		server.ext('onPostAuth', internals.validateRoles)
	},
}

module.exports = plugin
