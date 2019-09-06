import '../../../../utils/polyfill'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
const branded = process.env.OBSANDBOXAUTH_BRANDED
// using require since import needs to be at top level
if (branded) {
	require('../css/theme.bnppf.css')
} else {
	require('../css/theme.css')
}
import './style.css'

/**
 * @returns { Object } -
 */
class Accounts extends Component {


	/**
	 * 
	 * @param {*} value -
	 * @returns {Void} -  
	 */
	submit(value) {
		const id = document.getElementById('paymentId').value
		const clientId = document.getElementById('clientId').value
		
		fetch(`/payment-requests/${id}/consent?client_id=${clientId}`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({account_selection: value}),
		})
			.then((res)=>res.json())
			.then((res)=> {
				if (res.redirect)
					window.location = res.redirect
				
			})
	}

	/**
   * @returns { Object } -
   */
	render() {

		const accounts = JSON.parse(document.getElementById('accountList').value)
		let brand = document.getElementById('brand')
		brand = brand && brand.value ? brand.value : null
		const brandName = branded ? brand.replace('_logo.svg', '') : ''
		
		return (
			<div style={styles.container}>
				<div style={styles.wrapper}>
					{
						brand && <img style={styles.center} src={`/assets/images/${brand}`} />
					}
					<div style={{...styles.header, ...styles[`header-${brandName}`]}}>Select Account</div>
					<div style={styles.subtitle}>Current Accounts</div>
					<div style={styles.accountsWrapper}>

						{accounts.map((account, idx)=>{
							return (
								<div style={styles.account} key={idx} onClick={()=>this.submit(account.accountId.iban)}>
									<div style={{...styles.accountUser, ...styles[`accountUser-${brandName}`]}}>{account.name}</div>
									<div style={styles.accountName}>Comfort Pack (placeholder)</div>
									<div style={styles.accountIban}>{account.accountId.iban}</div>
									<div style={styles.accountValue}>{account.balances[0].balanceAmount.amount} {account.balances[0].balanceAmount.currency}</div>
								</div>
							)
						})}

					</div>
				</div>
			</div>
		)
	}
}

const styles = {
	container: {
		height: '100%',
		padding: 30,
		boxSizing: 'border-box',
	},
	wrapper: {
		alignItems: 'left',
		borderRadius: 0,
		padding: 0,
		height: '100%',
		backgroundColor: '#fff',
		maxWidth: 600,
		minWidth: 450,
		margin: '0px auto',
	},
	header: {
		padding: '12px 20px',
		fontSize: 18,
		color: '#fff',
		textTransform: 'uppercase',
		lineHeight: '1.5em',
		backgroundColor: '#00965e',
	},
	'header-bnppf': {
		color: '#fff',
		backgroundColor: '#00965e',
	},
	'header-hellobank': {
		color: '#fff',
		background: '#4ec1d3',
		// eslint-disable-next-line no-dupe-keys
		background: '-moz-linear-gradient(top,#4ec1d3 0%,#1c87ad 100%)',
		// eslint-disable-next-line no-dupe-keys
		background: '-webkit-gradient(linear,left top,left bottom,color-stop(0%,#4ec1d3),color-stop(100%,#1c87ad))',
		// eslint-disable-next-line no-dupe-keys
		background: '-webkit-linear-gradient(top,#4ec1d3 0%,#1c87ad 100%)',
		// eslint-disable-next-line no-dupe-keys
		background: '-o-linear-gradient(top,#4ec1d3 0%,#1c87ad 100%)',
		// eslint-disable-next-line no-dupe-keys
		background: '-ms-linear-gradient(top,#4ec1d3 0%,#1c87ad 100%)',
		// eslint-disable-next-line no-dupe-keys
		background: 'linear-gradient(to bottom,#4ec1d3 0%,#1c87ad 100%)',
		filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#4ec1d3\', endColorstr=\'#1c87ad\', GradientType=0)',
	},
	'header-fintro': {
		color: '#000000',
		backgroundColor: '#f6f6f6',
		fontFamily: '\'cond_regular\', arial',
	},
	subtitle: {
		padding: '12px 20px',
		fontSize: 14,
		textTransform: 'uppercase',
		lineHeight: '1.5em',
		backgroundColor: '#eeeeee',
		borderBottom: '1px solid #cecece',
	},
	accountsWrapper: {

	},
	account: {
		padding: '13px 20px',
		position: 'relative',
		borderBottom: '1px solid #cecece',
		cursor: 'pointer',
	},
	accountUser: {
		color: '#00965e',
		textTransform: 'uppercase',
		lineHeight: '1.5em',
		fontSize: 16,
	},
	'accountUser-bnppf': {
		color: '#00965e',
	},
	'accountUser-hellobank': {
		color: '#ff5a64',
	},
	'accountUser-fintro': {
		color: '#004e90',
	},
	accountName: {
		fontSize: 14,
		lineHeight: '1.5em',
	},
	accountIban: {
		fontSize: 16,
		lineHeight: '1.5em',
	},
	accountValue: {
		position: 'absolute',
		right: 20,
		top: 13,
	},
	center: {
		display: 'block',
		marginLeft: 'auto',
		marginRight: 'auto',
		padding: '25px',
	},
}

ReactDOM.render(<Accounts />, document.getElementById('accounts'))
