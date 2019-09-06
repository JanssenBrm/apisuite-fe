import '../../../../utils/polyfill'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Authorize from '../components/authorize'
const branded = process.env.OBSANDBOXAUTH_BRANDED
// using require since import needs to be at top level
if (branded) {
	require('../css/theme.bnppf.css')
} else {
	require('../css/theme.css')
}

/**
 * @returns { Object } -
 */
class Authorization extends Component {
	/**
   * @returns { Object } -
   */
	render() {

		const scopesText = JSON.parse(document.getElementById('scopesText').value)
		const clientId = document.getElementById('client_id').value
		const redirectUri = document.getElementById('redirect_uri').value
		const scope = document.getElementById('scope').value
		const state = document.getElementById('state').value
		const responseType = document.getElementById('response_type').value
		const authorizationText = document.getElementById('authorizationText').value
		const appName = document.getElementById('appName').value
		const permissionsText = document.getElementById('permissionsText').value
		const authorizeButton = document.getElementById('authorizeButton').value
		const rejectButton = document.getElementById('rejectButton').value
		const authorize = document.getElementById('authorize').value
		let brand = document.getElementById('brand')
		brand = brand && brand.value ? brand.value : null

		const options = {
			scopesText,
			clientId,
			redirectUri,
			scope,
			state,
			responseType,
			authorizationText,
			appName,
			permissionsText,
			authorizeButton,
			rejectButton,
			authorize,
			brand,
		}

		return (
			<div>
				<Authorize options = { options } />
			</div>
		)
	}
}

ReactDOM.render(<Authorization />, document.getElementById('authorization'))
