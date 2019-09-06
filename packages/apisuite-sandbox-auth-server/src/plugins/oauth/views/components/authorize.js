/* eslint react/prop-types: 0 */

import React from 'react'
import Paper from './Paper'
import Button from './Button'

/**
 * @param { Object } props -
 * @returns { Function} - 
 */
const Authorize = props => {
	const { options } = props
	const brandName = options.brand ? options.brand.replace('_logo.svg', '') : ''

	return (
		<div>
			<Paper>				
				<div style={{width: '100%'}} className='form-authorize'>
					{
						options.brand && <img style={styles.center} src={`/assets/images/${options.brand}`} />
					}
					<strong>{options.authorize}</strong>
					<div className='muted' style={styles.meta}>
						{options.appName} {options.authorizationText}, with the following scopes:
					</div>
					<div className='muted' style={styles.scopes}>
						{/* {options.permissions} */}
						<ul>
							{options.scopesText.map((s, idx)=>{
								return (
									<li key={idx}><span>{s}</span></li>
								)
							})}
						</ul>
					</div>
					<Button label='Authorize' type='submit' variation={brandName} />
				</div>
			</Paper>
		</div>
	)
}

Authorize.propTypes = {

}

const styles = {
	meta: {
		margin: '10px 0',
	},
	scopes: {
		margin: '0 0 30px 0',
	},
	center: {
		display: 'block',
		marginLeft: 'auto',
		marginRight: 'auto',
		maxHeight: '80px',
		padding: '25px',
	},
}

export default Authorize
