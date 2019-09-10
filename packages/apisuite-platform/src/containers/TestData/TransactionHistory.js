import React, { Component } from 'react'
import { array, object, func } from 'prop-types'
import { FormattedMessage } from 'react-intl'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Typography } from '@material-ui/core'
import currencySymbols from 'util/currency'

class TransactionHistory extends Component {
  state = {
    iban: '',
    transactions: {},
    passwordVisible: false,
    ui: {
      loading: false,
    },
    errors: [],
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.transactions !== prevState.transactions || nextProps.ui !== prevState.ui) {
      return {
        transactions: nextProps.transactions,
        ui: nextProps.ui,
      }
    }
    return null
  }

  componentDidMount () {
    const { organizations } = this.props
    const organizationId = organizations && organizations.length ? organizations[0].id : null
    const { resourceId } = this.props.match.params
    if (organizationId) {
      this.props.getTestUserTransactions(organizationId, resourceId)
    }
  }

  navigate = route => () => {
    this.props.history.push(route)
  }

  renderLoading = () =>
    <div className='transaction-loading'>
      <CircularProgress className='loading-circle' />
    </div>

  render () {
    const { transactions, ui } = this.state
    const iban = transactions.iban || ''
    const transactionList = transactions.transactions || []

    return (
      <div className='transaction-list-container'>
        {!ui.loading &&
          <div className='transaction-content'>
            <span className='transaction-iban'>
            IBAN {iban}
            </span>
            <div className='transaction-block'>
              <div className='transaction-block-header'>
                <FormattedMessage id='testData.transaction.header' />
              </div>
              {transactionList.length > 0 && transactionList.map((acc, idx) =>
                <div key={`account-transaction-${idx}`} className='transaction-block-wrapper'>
                  <div className='transaction-info'>
                    <div className='transaction-date'>{acc.transactionDate}</div>
                    <div className='transaction-operation'>{acc.creditDebitIndicator} operation</div>
                    <div className='transaction-summary'>{acc.summary}</div>
                    <div className='transaction-summary'>{acc.detailedSummary}</div>
                  </div>
                  <div className='transaction-amount'><Typography variant='display1'>{`${currencySymbols[acc.transactionAmount.currency] || acc.transactionAmount.currency} ${parseFloat(acc.transactionAmount.amount).toFixed(2)}`}</Typography></div>

                </div>
              )}
              {transactionList.length === 0 &&
                <div className='transaction-block-wrapper'>
                  <span className='transaction-text'><FormattedMessage id='testData.transaction.notransaction' /></span>
                </div>}
            </div>
          </div>}
        {ui.loading && this.renderLoading()}
      </div>
    )
  }
}

TransactionHistory.propTypes = {
  history: object.isRequired,
  match: object.isRequired,
  getTestUserTransactions: func.isRequired,
  organizations: array.isRequired,
  transactions: object.isRequired,
  ui: object.isRequired,
}

export default TransactionHistory
