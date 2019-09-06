/* eslint react/prop-types: 0 */

import React from 'react'

/**
 * 
 * @param {*} options - 
 * @returns {Function} -  
 */
const InputField = ({ label, type, placeholder, value, onChange, id, name }) => (
	<div style={styles.wrapper}>
		{
			label &&
<div style={styles.label}>
	{label}
</div>
		}
		<input
			style={styles.input}
			type={type}
			onChange={onChange}
			placeholder={placeholder}
			value={value}
			id={id}
			name={name}
		/>
	</div>
)

InputField.propTypes = {

}

const styles = {
	wrapper: {
		margin: '10px 0 32px',
	},
	label: {
		width: '100%',
		lineHeight: '1.5em',
		fontWeight: 400,
		marginBottom: 7,
	},
	input: {
		fontSize: 16,
		fontFamily: 'inherit',
		width: '100%',
		lineHeight: '1.5em',
		fontWeight: 300,
		border: '1px solid #b7b7b7',
		padding: 9,
	},
}

export default InputField
