/* eslint react/prop-types: 0 */
import React from 'react'


/**
 * 
 * @param {*} param0 -
 * @returns {Function} - 
 */
const DropdownUI = ({ label, type, onClick }) => (
	<div
		type={type}
		onClick={onClick}
		style={styles.button}
	>
		{label}
	</div>
)

DropdownUI.propTypes = {
  
}

const styles = {
	button: {
		width: '100%',
		backgroundImage: 'linear-gradient(to bottom, #ffffff, #f3f4f6)',
		borderRadius: 0,
		fontSize: 16,
		fontWeight: 300,
		color: '#777',
		padding: 12,
		border: '1px solid #b7b7b7',
		boxSizing: 'border-box',
		textTransform: 'none',
		textAlign: 'left',
	},
}

export default DropdownUI
