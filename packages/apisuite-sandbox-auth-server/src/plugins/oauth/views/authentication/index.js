import '../../../../utils/polyfill'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SignIn from '../components/signin'
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
class Authentication extends Component {
	/**
   * @returns { Object } -
   */
	render() {
		const err = document.getElementById('err')
		let brand = document.getElementById('brand')
		brand = brand && brand.value ? brand.value : null

		return (
			<div>
				<SignIn brand={brand} err={err} />
			</div>
		)
	}
}

ReactDOM.render(<Authentication />, document.getElementById('authentication'))
