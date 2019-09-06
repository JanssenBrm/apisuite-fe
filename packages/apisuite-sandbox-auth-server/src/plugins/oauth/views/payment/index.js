import '../../../../utils/polyfill'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Button from '../components/Button'
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
class Payment extends Component {

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
	 * @returns {void}
	 */
	cancel() {
		const id = document.getElementById('paymentId').value
		const clientId = document.getElementById('clientId').value

		fetch(`/payment-requests/${id}/cancel?client_id=${clientId}`, {
			method: 'POST',
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

		const debtorName = document.getElementById('debtorName').value
		const debtorAccountField = document.getElementById('debtorAccount')
		const debtorAccount = debtorAccountField ? debtorAccountField.value : null

		const amount = document.getElementById('amount').value
		const currency = document.getElementById('currency').value
		const creditorAccount = document.getElementById('creditorAccount').value
		const creditorName = document.getElementById('creditorName').value
		const executionDate = document.getElementById('executionDate').value
		let brand = document.getElementById('brand')
		brand = brand && brand.value ? brand.value : null
		const brandName = branded ? brand.replace('_logo.svg', '') : ''

		const client = debtorName && debtorAccount

		return (
			<div style={styles.wrapper} >
				{
					brand && <img style={styles.center} src={`/assets/images/${brand}`} />
				}
				<div style={styles.header}>Confirm Payment</div>
				<div style={styles.tableWrapper}>
					<div style={styles.tableRow}>
						<div style={styles.rowTitle}>From</div>
						<div style={styles.rowContent}>
							{client &&
                <span>{debtorName}, {JSON.parse(debtorAccount).iban}</span>
							}
							{!client &&
                <div>Select an account on the next step</div>
							}
						</div>
					</div>
					<div style={styles.tableRow}>
						<div style={styles.rowTitle}>Amount</div>
						<div style={styles.rowContent}>
							{amount} {currency}
						</div>
					</div>

					<div style={styles.tableRow}>
						<div style={styles.rowTitle}>To</div>
						<div style={styles.rowContent}>
							{creditorName}, {creditorAccount}
						</div>
					</div>

					<div style={{...styles.tableRow, borderBottom: 'none'}}>
						<div style={styles.rowTitle}>Execution Date</div>
						<div style={styles.rowContent}>
							{executionDate}
						</div>
					</div>

				</div>
				<div style={styles.tableActions}>
					{/* The buttons */}
					<div style={styles.buttonWrapper}>
						<Button label='Cancel' type='reset' variation='grey' onClick={this.cancel}/>
					</div>
					{!client ?

						<div style={styles.buttonWrapper}>
							<Button label='Continue' type='submit' variation={brandName} />
						</div> :
						<div style={styles.buttonWrapper}>
							<Button label='Continue' type='button' onClick={()=>this.submit(JSON.parse(debtorAccount).iban)} variation={brandName} />
						</div>
					}
				</div>
			</div>
		)
	}
}


const styles = {
	wrapper: {
		alignItems: 'left',
		borderRadius: 0,
		boxShadow: '2px 2px rgba(0, 0, 0, 0.09)',
		border: '1px solid #cecece',
		padding: 0,
		backgroundColor: '#fff',
		maxWidth: 750,
		minWidth: 450,
		margin: '50px auto',
	},
	header: {
		padding: '16px 32px',
		borderBottom: '1px solid #cecece',
		fontSize: 30,
		lineHeight: '1.5em',
	},
	tableWrapper: {
		padding: '0 32px 16px 32px',
	},
	tableRow: {
		padding: '16px 0',
		borderBottom: '1px solid #cecece',
		lineHeight: '1.5em',
		overflow: 'hidden',
	},
	rowTitle: {
		float: 'left',
		width: 167,
		fontWeight: 400,
		overflow: 'hidden',
	},
	rowContent: {
		display: 'block',
		fontWeight: 300,
		textTransform: 'uppercase',
		overflow: 'hidden',
	},
	tableActions: {
		borderTop: '1px solid #cecece',
		padding: '32px',
		textAlign: 'right',
	},
	buttonWrapper: {
		width: 150,
		display: 'inline-block',
		marginLeft: 16,
	},
	center: {
		display: 'block',
		marginLeft: 'auto',
		marginRight: 'auto',
		maxHeight: '80px',
		padding: '25px',
	},
}

ReactDOM.render(<Payment />, document.getElementById('payment'))
