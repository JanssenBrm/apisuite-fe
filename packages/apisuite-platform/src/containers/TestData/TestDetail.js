import React, { Component } from 'react'
import { array, object, func } from 'prop-types'
import { FormattedMessage } from 'react-intl'
import FormField, { parseErrors, isValidEmail, isValidURL } from 'components/FormField'
import { VisibilityOffOutlined, VisibilityOutlined } from '@material-ui/icons'
import PaymentIcon from '@material-ui/icons/Payment'
// import BeneficiariesIcon from '@material-ui/icons/PermContactCalendarOutlined'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'
import classnames from 'classnames'
import avatarDefault from 'assets/avatar_upload.svg'
import { hasMinLength } from 'util/validatePassword'
import currencySymbols from 'util/currency'

class TestDetail extends Component {
  state = {
    testuser: {
      name: '',
      email: '',
      username: '',
      password: '',
      avatarUrl: '',
      totalBalance: 0,
      accounts: []
    },
    passwordVisible: false,
    errors: [],
    showErrors: false
  }
  componentDidMount () {
    const { organizations } = this.props
    const organizationId = organizations && organizations.length ? organizations[0].id : null
    const { psuId } = this.props.match.params
    if (organizationId) this.props.getTestUser(organizationId, psuId)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.testuser !== this.props.testuser) {
      const { name, email, username, password, avatarUrl, accounts, totalBalance } = nextProps.testuser
      const data = { name, email, username, password, avatarUrl, accounts, totalBalance }
      this.setState({ testuser: data })
    }
  }

  togglePasswordVisibility = fieldName => event => {
    this.setState({ [`${fieldName}Visible`]: !this.state[`${fieldName}Visible`] })
  }

  handleChange = ({ target }, errors) => {
    this.setState({
      testuser: { ...this.state.testuser, [target.name]: target.value },
      errors: parseErrors(target, errors, this.state.errors)
    })
  }

  handleUpdate = () => {
    const organizationId = this.props.organizations[0].id
    const { psuId } = this.props.match.params
    if (!organizationId) return

    const { name, email, password, avatarUrl } = this.state.testuser
    const data = { name, email, password, avatarUrl }
    this.props.updateTestUser(organizationId, psuId, data)
  }

  calculateTransactions = () =>
    this.state.testuser.accounts.reduce((acc, curr) => (acc + curr.totalTransactions), 0)

  navigate = route => event => {
    this.props.history.push(route)
  }

  render () {
    const { intl } = this.props
    const { passwordVisible, errors, showErrors, testuser } = this.state
    const PasswordIcon = passwordVisible ? VisibilityOutlined : VisibilityOffOutlined
    const usernameLabel = intl.formatMessage({ id: 'testData.username.label' })
    const nameRequired = intl.formatMessage({ id: 'testData.name.required' })
    const emailRequired = intl.formatMessage({ id: 'testData.email.required' })
    const passwordRequired = intl.formatMessage({ id: 'testData.password.required' })
    const avatarLabel = intl.formatMessage({ id: 'testData.create.avatar.placeholder' })
    const avatarRequired = intl.formatMessage({ id: 'testData.create.avatar.required' })
    const { psuId } = this.props.match.params

    return (
      <div className='test-detail-container'>
        <div className='detail-content'>
          <div className='detail-row'>
            <div className='left-container'>
              <div className='left-container-avatar'>
                {testuser.avatarUrl
                  ? <div
                    className={classnames('test-user-avatar', { 'empty-avatar': !isValidURL(testuser.avatarUrl) })}
                    style={{...(isValidURL(testuser.avatarUrl) && { backgroundImage: `url(${testuser.avatarUrl})` })}}
                  />
                  : <div className='test-user-avatar test-user-default'>
                    <img src={avatarDefault} />
                  </div>
                }
              </div>
              <div className='left-container-button'>
                <Button
                  id='update-testuser-btn'
                  testid='update-testuser-btn'
                  className='update-button gradient'
                  variant='outlined'
                  onClick={this.handleUpdate}
                  disabled={errors.length > 0}
                >
                  <FormattedMessage id='testData.detail.update' />
                </Button>
              </div>
            </div>
            <div className='detail-container'>
              <div className='detail-block basic'>
                <div className='user-info'>
                  <div className='detail-block-header'>
                    <FormattedMessage id='testData.userInfo.header' />
                  </div>
                  <div className='detail-block-wrapper'>
                    <FormField
                      fullWidth
                      id='test-detail-name'
                      testid='test-detail-name'
                      className='detail-formfield'
                      name='name'
                      value={testuser.name}
                      onChange={this.handleChange}
                      rules={[
                        { rule: testuser.name.length >= 2, message: nameRequired }
                      ]}
                      showerrors={`${showErrors}`}
                    />
                    <FormField
                      fullWidth
                      id='test-detail-email'
                      testid='test-detail-email'
                      className='detail-formfield'
                      name='email'
                      value={testuser.email}
                      onChange={this.handleChange}
                      rules={[
                        {rule: isValidEmail(testuser.email), message: emailRequired}
                      ]}
                      showerrors={`${showErrors}`}
                    />
                    <FormField
                      id='user-avatar'
                      testid='user-avatar'
                      className='user-avatar'
                      label={avatarLabel}
                      name='avatarUrl'
                      onChange={this.handleChange}
                      value={testuser.avatarUrl || ''}
                      rules={[
                        { rule: testuser.avatarUrl ? isValidURL(testuser.avatarUrl) : true, message: avatarRequired }
                      ]}
                      showerrors={`${showErrors}`}
                    />
                  </div>
                </div>
                <div className='separator' />
                <div className='pass-info'>
                  <div className='detail-block-header'>
                    <FormattedMessage id='testData.passphrase.header' />
                  </div>
                  <div className='detail-block-wrapper credentials'>
                    <FormField
                      disabled
                      fullWidth
                      id='test-detail-username'
                      testid='test-detail-username'
                      className='detail-formfield'
                      label={usernameLabel}
                      name='username'
                      value={testuser.username}
                      showerrors={`${showErrors}`}
                    />
                    <div className='password-row'>
                      <FormField
                        id='test-detail-password'
                        testid='test-detail-password'
                        className='detail-formfield'
                        inputtype={passwordVisible ? 'text' : 'password'}
                        name='password'
                        value={testuser.password}
                        onChange={this.handleChange}
                        rules={[
                          { rule: hasMinLength(testuser.password), message: passwordRequired }
                        ]}
                        showerrors={`${showErrors}`}
                      />
                      <Button
                        id='test-detail-toggle-btn'
                        testid='test-detail-toggle-btn'
                        classes={{root: 'pass-toggle-button'}}
                        variant='outlined'
                        onClick={this.togglePasswordVisibility('password')}
                      >
                        <PasswordIcon />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='detail-row'>
                <div className='kpis-container'>
                  <div className='kpi-block'>
                    <span className='kpi-value'>{`€ ${parseFloat(testuser.totalBalance).toFixed(2)}`}</span>
                    <span className='kpi-label'><FormattedMessage id='testData.kpi.total' /></span>
                  </div>
                  {/* <div className='kpi-block'>
                    <span className='kpi-value'>{`${4}`}</span>
                    <span className='kpi-label'><FormattedMessage id='testData.kpi.beneficiaries' /></span>
                  </div> */}
                  <div className='kpi-block'>
                    <span className='kpi-value'>{this.calculateTransactions()}</span>
                    <span className='kpi-label'><FormattedMessage id='testData.kpi.transactions' /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='kpis-separator' />

          <div className='detail-block'>
            <div className='detail-block-header'>
              <FormattedMessage id='testData.accounts.header' />
              <span className='balance'><FormattedMessage id='testData.balance.header' /></span>
            </div>
            {testuser.accounts && testuser.accounts.map((acc, idx) =>
              <div key={`user-account-${idx}`} className='detail-block-wrapper'>
                <div className='account-info'>
                  <div className='account-name'>{acc.name}</div>
                  <div className='account-iban'>{`IBAN ${acc.accountId.iban}`}</div>
                  <div className='account-bic'>{`BIC ${acc.bicFi}`}</div>
                </div>
                <div className='account-detail' onClick={this.navigate(`/testdata/${psuId}/transactions/${acc.id}`)}>
                  <span className='bank-account-link'><FormattedMessage id='testData.transaction.link' /></span>
                  <PaymentIcon />
                </div>
                {/* <div className='account-detail disabled'>
                  <span className='bank-account-link'><FormattedMessage id='testData.beneficiaries.link' /></span>
                  <BeneficiariesIcon />
                </div> */}

                <div className='current-balance'><Typography variant='display1'>{`${currencySymbols[acc.balances[0].balanceAmount.currency] || acc.balances[0].balanceAmount.currency} ${parseFloat(acc.balances[0].balanceAmount.amount).toFixed(2)}`}</Typography></div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

TestDetail.propTypes = {
  history: object.isRequired,
  match: object.isRequired,
  testuser: object.isRequired,
  getTestUser: func.isRequired,
  updateTestUser: func.isRequired,
  organizations: array.isRequired,
  intl: object.isRequired
}

export default TestDetail
