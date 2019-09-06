import React, { Fragment } from 'react'
import { func, object } from 'prop-types'
import Button from '@material-ui/core/Button'
import FormField, { parseErrors, isValidURL, isValidEmail } from 'components/FormField'
import { FormattedMessage, injectIntl } from 'react-intl'
import MultiSelect from 'components/MultiSelect'
import randomPass from 'util/generateRandomString'
import { VisibilityOffOutlined, VisibilityOutlined } from '@material-ui/icons'

import autoGenerate from 'assets/auto_generate.svg'
import validatePassword, { MIN_LENGTH } from 'util/validatePassword'

class CreateTestUser extends React.Component {
  state = {
    form: {
      name: '',
      email: '',
      password: '',
      avatar: '',
      accounts: []
    },
    accountTypes: [],
    errors: [],
    showErrors: false,
    passwordVisible: false
  }

  componentDidMount () {
    const {accounts, testUser} = this.props
    const {form} = this.state
    // Fetch accounts types
    if (!accounts.length) {
      this.props.getTestUserAccounts()
    }
    if (testUser) {
      this.setState({
        form: {
          ...form,
          name: testUser.fullName,
          email: testUser.email,
          avatar: testUser.avatar,
          password: randomPass()
        },
        passwordVisible: true
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    const {accounts} = nextProps
    if (accounts && this.props.accounts !== accounts) {
      this.setState({accountTypes: accounts.form.accountTypes.map((t) => ({id: t.id, name: t.type}))})
    }
  }

  handleSubmit = (e) => {
    const {organization} = this.props
    const {errors, form} = this.state
    const {name, email, password, avatar, accounts} = form

    if (!errors.length) {
      const testuserData = {
        fullName: name,
        email,
        passPhrase: password,
        accountTypes: accounts
      }
      if (avatar) {
        testuserData.avatar = avatar
      }
      this.props.createTestUser(organization.id, testuserData)
      this.props.closeModal(true)
    } else {
      this.setState({
        showErrors: true
      })
    }
  }

  handleChange = ({target}, errors) => {
    this.setState({
      form: {...this.state.form, [target.name]: target.value},
      errors: parseErrors(target, errors, this.state.errors)
    })
  }

  handleCheckboxChange = item => event => {
    const {form} = this.state
    const {accounts} = form
    this.setState({
      form: {
        ...form,
        accounts: event.target.checked ? [...accounts, item] : accounts.filter(sub => sub.id !== item.id)
      }
    })
  }

  generatePass = () => {
    const passPhrase = {
      target: {
        name: 'password',
        value: randomPass()
      }
    }
    this.setState({passwordVisible: true})
    this.handleChange(passPhrase)
  }

  togglePasswordVisibility = () => {
    this.setState({passwordVisible: !this.state.passwordVisible})
  }

  render () {
    const {intl, ui} = this.props
    const {form, accountTypes, showErrors, errors, passwordVisible} = this.state
    const basicInfoLabel = intl.formatMessage({id: 'testData.create.basicinfo'})
    const namePlaceholder = intl.formatMessage({id: 'testData.create.name.placeholder'})
    const nameRequired = intl.formatMessage({id: 'testData.name.required'})
    const emailPlaceholder = intl.formatMessage({id: 'testData.create.email.placeholder'})
    const emailRequired = intl.formatMessage({id: 'testData.email.required'})
    const avatarURLPlaceholder = intl.formatMessage({id: 'testData.create.avatar.placeholder'})
    const avatarURLRequired = intl.formatMessage({id: 'testData.create.avatar.required'})
    const passwordLabel = intl.formatMessage({id: 'testData.create.password.label'})
    const passwordRequired = intl.formatMessage({id: 'testData.create.password.required'})
    const passwordHelper = intl.formatMessage({id: 'testData.create.password.helper'})
    const accountsLabel = intl.formatMessage({id: 'testData.create.accounts.label'})
    const submitLabel = intl.formatMessage({id: 'createApp.actions.submit'})

    // User is validated to subscribe to APIs
    // subscriptions.products.sort((p1, p2) => p1.brand_id - p2.brand_id)
    // const subscriptionsToShow = subscriptions.products.filter(s => s.isSubscribed)
    const PasswordIcon = passwordVisible ? VisibilityOutlined : VisibilityOffOutlined

    return (
      <div className='page-content-wrapper create-testuser-container'>
        <div className='create-testuser-wrapper'>
          <FormField
            required
            className='create-testuser-input'
            id='testuser-name'
            testid='testuser-name'
            name='name'
            label={basicInfoLabel}
            placeholder={namePlaceholder}
            onChange={this.handleChange}
            value={form.name}
            InputLabelProps={{shrink: true}}
            rules={[
              {rule: form.name.length, message: nameRequired}
            ]}
            showerrors={`${showErrors}`}
          />
          <FormField
            required
            className='create-testuser-input'
            id='testuser-email'
            testid='testuser-email'
            name='email'
            placeholder={emailPlaceholder}
            onChange={this.handleChange}
            value={form.email}
            InputLabelProps={{shrink: true}}
            rules={[
              {rule: form.email ? isValidEmail(form.email) : true, message: emailRequired}
            ]}
            showerrors={`${showErrors}`}
          />
          <FormField
            className='create-testuser-input'
            id='testuser-avatar'
            testid='testuser-avatar'
            name='avatar'
            placeholder={avatarURLPlaceholder}
            onChange={this.handleChange}
            value={form.avatar}
            InputLabelProps={{shrink: true}}
            rules={[
              {rule: form.avatar ? isValidURL(form.avatar) : true, message: avatarURLRequired}
            ]}
            showerrors={`${showErrors}`}
          />

          <FormField
            className='create-testuser-input testuser-password'
            id='testuser-password'
            testid='testuser-password'
            required
            inputtype={passwordVisible ? 'text' : 'password'}
            name='password'
            label={passwordLabel}
            helperText={form.password && validatePassword(form.password).length ? `${passwordRequired} ${validatePassword(form.password).join(', ')}` : passwordHelper}
            onChange={this.handleChange}
            value={form.password}
            endadornment={
              <Fragment>
                <Button
                  className='password-btn auto-generate-btn end'
                  id='security-generate-pass-btn'
                  testid='security-generate-pass-btn'
                  onClick={this.generatePass}
                >
                  <img src={autoGenerate} />
                </Button>
                <Button
                  id='security-pass-toggle-btn'
                  testid='security-pass-toggle-btn'
                  classes={{root: 'password-btn'}}
                  variant='outlined'
                  onClick={this.togglePasswordVisibility}
                >
                  <PasswordIcon />
                </Button>
              </Fragment>
            }
            disabled={ui.loading}
            rules={[
              {
                rule: !validatePassword(form.password).length,
                message: `${passwordRequired} ${validatePassword(form.password).join(', ')}`
              }
            ]}
            showerrors={`${showErrors}`}
          />

          <MultiSelect
            // expanded={isValidated}
            // disabled={!isValidated || subscriptionsToShow.length === 0}
            label={accountsLabel}
            options={accountTypes}
            onChange={this.handleCheckboxChange}
            selected={form.accounts}
          />

          <div className='create-testuser-actions'>
            <Button
              className='create-testuser-submit'
              testid='create-testuser-submit-btn'
              variant='contained'
              color='primary'
              onClick={this.handleSubmit}
              disabled={!form.name || !form.email || !form.password || !form.accounts.length || form.password.length < MIN_LENGTH || errors.length > 0 || ui.loading}
            >
              {submitLabel}
            </Button>
            <div className='create-testuser-help'>
              <FormattedMessage id='createApp.actions.help' />
              <a className='create-testuser-link' testid='create-testuser-link' href='/docs'>
                <FormattedMessage id='createApp.actions.link' />
              </a>.
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateTestUser.propTypes = {
  /**
   * `react-intl` formatting API
   * See {@link https://github.com/yahoo/react-intl/wiki/API#injection-api}
   */
  intl: object.isRequired,
  /**
   * Test users UI state
   */
  ui: object.isRequired,
  /**
   * User organization object
   */
  organization: object.isRequired,
  /**
   * Test user object
   */
  testUser: object,
  /**
   * Closes Create App modal
   */
  closeModal: func,
  /**
   * List of test user account types
   */
  accounts: object.isRequired,
  /**
   * Create a new Test User
   */
  createTestUser: func.isRequired,
  /**
   * Get the list of test user accounts types
   */
  getTestUserAccounts: func.isRequired
}

export default injectIntl(CreateTestUser)
