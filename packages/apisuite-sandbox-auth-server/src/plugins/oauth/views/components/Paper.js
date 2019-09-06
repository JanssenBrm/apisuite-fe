/* eslint react/prop-types: 0 */
import React from 'react'


/**
 * 
 * @param {*} param0 -
 * @returns {Function} -
 */
const Paper = ({children}) => (
	<div
		style={styles.paper}
	>
		{children}
	</div>
)

Paper.propTypes = {
  
}

const styles = {
	paper: {
		alignItems: 'center',
		borderRadius: 0,
		boxShadow: '2px 2px rgba(0, 0, 0, 0.09)',
		border: '1px solid #cecece',
		padding: 30,
		backgroundColor: '#fff',
		maxWidth: 450,
		margin: '50px auto',
	},
}

export default Paper
