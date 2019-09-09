import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button'
import { object, func, number } from 'prop-types'
import { FormattedMessage } from 'react-intl'
import FormField, { parseErrors } from 'components/FormField'
import qs from 'qs'
import randomPass from 'util/generateRandomString'
import LinearProgress from '@material-ui/core/LinearProgress'
import { VisibilityOffOutlined, VisibilityOutlined } from '@material-ui/icons'

import autoGenerate from 'assets/auto_generate.svg'
import validatePassword, { MIN_LENGTH, hasMinSymbol, hasSpace } from 'util/validatePassword'

class ResetPassword extends Component {
  state = {
    showErrors: false,
    loading: false,
    form: {
      passPhrase: '',
    },
    errors: [],
    passStrength: 0,
    passStrengthLabel: 'weak',
    passwordVisible: false,
  }

  componentDidMount () {
    const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
    const { token } = query
    this.setState({ token })
  }

  togglePasswordVisibility = () => {
    this.setState({ passwordVisible: !this.state.passwordVisible })
  }

  goToLogin = () => {
    this.props.resetModal()
  }

  makeLoading = () => {
    this.setState({
      loading: true,
    })
  }

  handleSubmit = (e) => {
    const { errors, form, token } = this.state
    const { resetPassword, userId, updatePasswordRBAC } = this.props
    const { passPhrase } = form
    if (userId && passPhrase && !errors.length) {
      this.makeLoading()
      updatePasswordRBAC(userId, passPhrase)
    } else {
      if (passPhrase && token && !errors.length) {
        this.makeLoading()
        resetPassword(token, passPhrase)
      } else {
        this.setState({
          showErrors: true,
        })
      }
    }
  }

  handleChange = ({ target }, errors) => {
    this.setState({
      form: { ...this.state.form, [target.name]: target.value },
      errors: parseErrors(target, errors, this.state.errors),
    })
    if (target.name === 'passPhrase') {
      this.handlePassStrength()
    }
  }

  generatePass = () => {
    const passPhrase = {
      target: {
        name: 'passPhrase',
        value: randomPass(),
      },
    }
    this.setState({ passwordVisible: true })
    this.handleChange(passPhrase)
  }

  handlePassStrength = () => {
    const { passPhrase } = this.state.form
    let passStrength = 0

    this.setState({ passStrengthLabel: 'weak' })
    if (!validatePassword(passPhrase).length) {
      passStrength = 100 / 2
      this.setState({ passStrengthLabel: 'medium' })
    }
    if (!validatePassword(passPhrase).length && (hasMinSymbol(passPhrase, 2) || hasSpace(passPhrase))) {
      passStrength = 100
      this.setState({ passStrengthLabel: 'strong' })
    }
    this.setState({
      passStrength,
    })
  }

  render () {
    const { intl, ui, userId, resetModal } = this.props
    const { showErrors, form, loading, passStrength, passStrengthLabel, errors, passwordVisible } = this.state
    const { passPhrase } = form
    const { success } = ui

    const resetPasswordRequired = intl.formatMessage({ id: 'resetPassword.required' })
    const passPhraseLabel = intl.formatMessage({ id: 'resetPassword.newPassword.label' })
    const resetPassPhraseLabel = intl.formatMessage({ id: 'resetPassword.resetPassPhrase.label' })
    const resetPassPhraseSubtitle = intl.formatMessage({ id: 'resetPassword.resetPassPhrase.subtitle' })
    const resetPassPhraseHelp = intl.formatMessage({ id: 'resetPassword.resetPassPhrase.help' })
    const PasswordIcon = passwordVisible ? VisibilityOutlined : VisibilityOffOutlined

    if (success) {
      resetModal()
    }

    return (
      <div className=' page-content-wrapper recover-container'>
        <p>{resetPassPhraseSubtitle}</p>
        {!success &&
          <div className='recover-wrapper'>
            <br />
            <FormField
              placeholder={passPhraseLabel}
              helperText={passPhrase && validatePassword(passPhrase).length ? `${resetPasswordRequired} ${validatePassword(passPhrase).join(', ')}` : resetPassPhraseHelp}
              className='recover-field'
              testid='recover-passphrase'
              name='passPhrase'
              inputtype={passwordVisible ? 'text' : 'password'}
              onChange={this.handleChange}
              value={passPhrase}
              endadornment={
                <>
                  <Button
                    className='password-btn auto-generate-btn end'
                    id='recover-generate-pass-btn'
                    testid='recover-generate-pass-btn'
                    onClick={this.generatePass}
                  >
                    <img src={autoGenerate} />
                  </Button>
                  <Button
                    id='recover-pass-toggle-btn'
                    testid='recover-pass-toggle-btn'
                    classes={{ root: 'password-btn' }}
                    variant='outlined'
                    onClick={this.togglePasswordVisibility}
                  >
                    <PasswordIcon />
                  </Button>
                </>
              }
              disabled={loading}
              rules={[
                {
                  rule: !validatePassword(passPhrase).length,
                  message: `${resetPasswordRequired} ${validatePassword(passPhrase).join(', ')}`,
                },
              ]}
              showerrors={`${showErrors}`}
            />
            <div className='linear-progress'>
              <div className='linear-progress-label'>{passStrengthLabel}</div>
              <LinearProgress
                variant='determinate'
                value={passStrength}
                color={passStrength === 100 ? 'primary' : 'secondary'}
              />
            </div>
            <Button
              className='recover-submit'
              testid='recover-submit-btn'
              variant='contained'
              color='primary'
              onClick={this.handleSubmit}
              disabled={!passPhrase || passPhrase.length < MIN_LENGTH || (errors && errors.length > 0)}
            >
              {resetPassPhraseLabel}
            </Button>
            {!userId &&
              <div className='recover-no-account'>
                <FormattedMessage id='login.noAccount' />
                <a
                  href='/signup'
                  testid='recover-signup-link'
                  className='recover-link'
                >
                  <FormattedMessage id='login.signUp.text' />.
                </a>
              </div>}

          </div>}
        {success &&
          <div className='recover-done'>
            <Button
              id='recover-done-btn'
              testid='recover-done-btn'
              variant='contained'
              color='primary'
              onClick={this.goToLogin}
            >
              <FormattedMessage id='resetPassword.login.label' />
            </Button>
          </div>}
      </div>
    )
  }
}

ResetPassword.propTypes = {
  location: object.isRequired,
  userId: number,
  resetPassword: func.isRequired,
  updatePasswordRBAC: func.isRequired,
  intl: object.isRequired,
  ui: object,
  resetModal: func,
}

export default ResetPassword
