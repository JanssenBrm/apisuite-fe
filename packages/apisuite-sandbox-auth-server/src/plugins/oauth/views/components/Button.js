/* eslint react/prop-types: 0 */
import React from 'react'


/**
 * 
 * @param {*} param0 -
 * @returns {Function} - 
 */
const Button = ({ label, type, onClick, variation }) => (
	<button
		type={type}
		onClick={onClick}
		style={{...styles.button, ...styles[variation]}}
	>
		{label}
	</button>
)

Button.propTypes = {
  
}

const styles = {
	button: {
		width: '100%',
		backgroundColor: '#00965e',
		borderRadius: 0,
		fontSize: 16,
		fontWeight: 'normal',
		color: '#ffffff',
		textAlign: 'center',
		padding: 12,
		border: 0,
	},
	grey: {
		backgroundColor: '#cecece',
		color: '#333',
	},
	bnppf: {
		background: '#00965e',
		'&:hover': {
			background: '#006d44',
		},
	},
	hellobank: {
		background: '#ff5a64',
		border: '1px solid #ff5a64',
		'&:hover': {
			background: '#ffffff',
			color: '#ff5a64',
		},
	},
	fintro: {
		background: '#004e90',
		'&:hover': {
			background: '#003767',
		},
	},
}

export default Button
