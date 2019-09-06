import React from 'react'
import Paper from './Paper'
import Button from './Button'
import InputField from './InputField'
import PropTypes from 'prop-types'

/**
 * @param {Object} theme -
 * @returns { Object } -
 */

/**
 * @param { Object } props -
 * @returns { Function} -
 */
const SignIn = (props) => {
	const { brand, err } = props
	const brandName = brand ? brand.replace('_logo.svg', '') : ''
	return (<div>

		<Paper>
			<div style={{ width: '100%' }} className='form-authenticate'>
				{
					brand && <img style={style.center} src={`/assets/images/${brand}`} />
				}
				<InputField type='text' label='Username' name='username' id='username' />
				<InputField type='password' label='Password' name='password' id='password' />
				<Button label='Continue' type='submit' variation={brandName} />
				{
					err && err.value &&
					<div style={style.error}>
						<p>Incorrect username or password. Please try again.</p>
					</div>
				}
			</div>
		</Paper>
	</div>)
}

const style = {
	error: {
		color: '#e25241',
	},
	center: {
		display: 'block',
		marginLeft: 'auto',
		marginRight: 'auto',
		maxHeight: '80px',
		padding: '25px',
	},
}

SignIn.propTypes = {
	err: PropTypes.object,
	brand: PropTypes.string,
}

export default SignIn
