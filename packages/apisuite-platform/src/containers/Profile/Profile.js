import React, { Component } from 'react'
import { object, func } from 'prop-types'
import FormField, { parseErrors, isValidURL, isValidPhoneNumber } from 'components/FormField'
import DialogBox from 'components/DialogBox'
import Button from '@material-ui/core/Button'
import { Create, VisibilityOff, Visibility, AssignmentInd, AccountCircle, PermDeviceInformation } from '@material-ui/icons'
import { FormattedMessage } from 'react-intl'
import SecurityTwoFa from 'components/SecurityTwoFa'
import _isEmpty from 'lodash/isEmpty'
import moment from 'moment'

import validatePassword from 'util/validatePassword'

const methods = [
  {
    value: '1',
    key: 'authorizationApp',
  },
  {
    value: '2',
    key: 'authorizationSms',
  },
]

class Profile extends Component {
  state = {
    user: {
      fullName: '',
      bio: '',
      email: '',
      phone: '',
      avatar: '',
      confirmationCode: '',
      method: '2',
      github: false,
    },
    oldPassword: '',
    newPassword: '',
    oldPasswordVisible: false,
    newPasswordVisible: false,
    showErrors: false,
    code: '',
    smsSent: false,
    confirmationType: '',
    confirmationOpen: false,
    temporaryMethod: null,
    errors: [],
  }

  syncTwoFaMethod = (user) => {
    const defaultMethod = '2'
    const methodFound = methods.filter(m => m.key === user.twoFAMethod)
    if (methodFound.length > 0) {
      return methodFound[0].value
    }
    return defaultMethod
  }

  UNSAFE_componentWillMount () {
    const { user } = this.props
    const method = this.syncTwoFaMethod(user)

    if (!_isEmpty(user)) this.setState({ user: { ...user, method } })
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { user, TwoFA } = nextProps
    if (user !== this.props.user) {
      const method = this.syncTwoFaMethod(user)
      if (!_isEmpty(user)) this.setState({ user: { ...user, method } })
    }

    if (TwoFA.verify !== this.props.TwoFA.verify) {
      if (TwoFA.verify) {
        const { confirmationType, temporaryMethod } = this.state
        confirmationType === '2fa'
          ? temporaryMethod ? this.completeMethodChange() : this.showRecoveryCodes()
          : this.removeAccount()
      } else {
        this.setState({ confirmationOpen: false })
      }
    }
  }

  handleChange = ({ target }, errors) => {
    this.setState({
      user: { ...this.state.user, [target.name]: target.value },
      errors: parseErrors(target, errors, this.state.errors),
    })
  }

  handleTwoFaMethodChange = ({ target }) => {
    const { user } = this.state
    if (user.method !== target.value) {
      this.setState({
        confirmationOpen: true,
        confirmationType: '2fa',
        user: { ...this.state.user, code: '' },
        temporaryMethod: target.value,
        code: '',
        smsSent: false,
      })
    }
  }

  completeMethodChange = () => {
    this.setState({ user: { ...this.state.user, method: this.state.temporaryMethod }, confirmationOpen: false })
  }

  handlePasswordChange = ({ target }, errors) => {
    this.setState({
      [target.name]: target.value,
      errors: parseErrors(target, errors, this.state.errors),
    })
  }

  saveProfile = () => {
    const { user, errors } = this.state

    if (!errors.length) {
      this.props.updateUser(user)
    } else {
      this.setState({
        showErrors: true,
      })
    }
  }

  changePassword = () => {
    const { oldPassword, newPassword } = this.state
    this.props.updatePassword({ oldPassword, newPassword })
  }

  toggleConfirmation = type => () => {
    this.setState({
      confirmationOpen: !this.state.confirmationOpen,
      confirmationType: type,
      temporaryMethod: null,
      smsSent: false,
      user: { ...this.state.user, code: '' },
      code: '',
    })
  }

  handleCodeChange = ({ target }, errors) => {
    this.setState({
      code: target.value,
      errors: parseErrors(target, errors, this.state.errors),
    })
  }

  sendSMS = () => {
    this.setState({ smsSent: true })
    this.props.sendSMSCode()
  }

  verify2Fa = () => {
    const { code } = this.state
    if (this.state.temporaryMethod) {
      this.props.twoFaVerify(code)
    } else {
      this.props.getCodes(code)
    }
  }

  confirmationContent = type => {
    if (type === '2fa') {
      const { intl } = this.props
      const { code, showErrors, smsSent } = this.state
      const codePlaceholder = intl.formatMessage({ id: 'twofa.code.placeholder' })
      const codeLabel = intl.formatMessage({ id: 'twofa.code.label' })
      const codeRequired = intl.formatMessage({ id: 'twofa.code.required' })

      return (
        <div>
          <div className='twofa-dialog-content'>
            <FormattedMessage id='profile.twofa.dialog.text' />
            <Button
              className='twofa-send-btn'
              id='twofa-send-sms'
              testid='twofa-send-sms'
              variant='contained'
              color='primary'
              onClick={this.sendSMS}
              disabled={smsSent}
            >
              <FormattedMessage id='profile.twofa.dialog.send' />
            </Button>

          </div>

          <FormField
            className='twofa-dialog-input'
            inputtype='number'
            id='twofa-code'
            testid='twofa-code'
            name='code'
            label={codeLabel}
            placeholder={codePlaceholder}
            onChange={this.handleCodeChange}
            value={code}
            fullWidth
            rules={[
              { rule: code && code.length === 6, message: codeRequired },
            ]}
            showerrors={`${showErrors}`}
            InputLabelProps={{ shrink: true }}
            disabled={!smsSent}
          />
        </div>
      )
    }
    return (
      <div>
        <FormattedMessage id='profile.removeaccount.text' />
        <br />
        <strong><FormattedMessage id='profile.removeaccount.subtext' /></strong>
      </div>
    )
  }

  removeAccount = () => {
    this.props.removeAccount(this.props.user.id)
  }

  togglePasswordVisibility = fieldName => () => {
    this.setState({ [`${fieldName}Visible`]: !this.state[`${fieldName}Visible`] })
  }

  showRecoveryCodes = () => {
    this.setState({ confirmationOpen: false })
  }

  render () {
    const { intl, logout, history, TwoFA, generateQRCode, sendSMSCode, twoFaUpdate } = this.props
    const {
      user,
      showErrors,
      oldPassword,
      newPassword,
      oldPasswordVisible,
      newPasswordVisible,
      confirmationOpen,
      confirmationType,
      code,
      smsSent,
      errors,
    } = this.state

    const securityTitle = intl.formatMessage({ id: 'navigation.security' })
    const fullNameLabel = intl.formatMessage({ id: 'profile.name.label' })
    const fullNameRequired = intl.formatMessage({ id: 'profile.name.required' })
    const bioLabel = intl.formatMessage({ id: 'profile.bio.label' })
    const emailLabel = intl.formatMessage({ id: 'profile.email.label' })
    const phoneNumberLabel = intl.formatMessage({ id: 'profile.phoneNumber.label' })
    const phoneNumberTypeError = intl.formatMessage({ id: 'profile.phoneNumber.typeError' })
    const avatarLabel = intl.formatMessage({ id: 'profile.avatarUrl.label' })
    const avatarTypeError = intl.formatMessage({ id: 'profile.avatarUrl.typeError' })
    const oldPasswordLabel = intl.formatMessage({ id: 'profile.oldPassphrase.label' })
    const newPasswordLabel = intl.formatMessage({ id: 'profile.newPassphrase.label' })
    const passwordRequired = intl.formatMessage({ id: 'profile.passphrase.required' })

    const OldPasswordIcon = oldPasswordVisible ? Visibility : VisibilityOff
    const NewPasswordIcon = newPasswordVisible ? Visibility : VisibilityOff

    const splitName = user.fullName ? user.fullName.split(' ') : ''
    const userInitials = splitName.length >= 2 ? `${splitName[0].charAt(0)}${splitName[1].charAt(0)}` : splitName.length ? splitName[0].slice(0, 2) : ''
    const memberSince = moment(user.created).format('MMMM Do, YYYY')
    const orgRole = user.roles.find(r => r.organizationId === user.organizations[0].id)
    const userRole = orgRole ? orgRole.role.charAt(0).toUpperCase() + orgRole.role.slice(1).toLowerCase() : 'Developer'

    return (
      user.fullName && (
        <div className='profile-container' id='profile-settings'>
          <div className='profile-section'>
            <div className='left-container'>
              <div className='avatar' style={{ ...(isValidURL(user.avatar) && { backgroundImage: `url(${user.avatar})` }) }}>
                {!isValidURL(user.avatar) && <span>{userInitials}</span>}
              </div>
              <div className='account-details'>
                <div className='detail-title'>{<FormattedMessage id='profile.accessLevel' />}</div>
                <div className='detail-value'>{userRole}<div className='access-level-badge trusted' /></div>

                {/* <div className='detail-title'>{<FormattedMessage id='profile.lastLogin' />}</div>
              <div className='detail-value'>Yesterday</div> */}

                <div className='detail-title'>{<FormattedMessage id='profile.memberSince' />}</div>
                <div className='detail-value'>{memberSince}</div>

                <div className='detail-title actions'>{<FormattedMessage id='profile.actions' />}</div>
                <Button
                  id='save-profile-btn'
                  testid='save-profile-btn'
                  className='save-button gradient'
                  variant='outlined'
                  onClick={this.saveProfile}
                  disabled={errors.length > 0}
                >
                  <FormattedMessage id='profile.actions.save' />
                </Button>
              </div>
            </div>
            <div className='right-container profile-wrapper'>
              <FormField
                bigfont='true'
                nobackground={1}
                id='user-name'
                testid='user-name'
                className='user-name'
                label={fullNameLabel}
                name='fullName'
                onChange={this.handleChange}
                value={user.fullName}
                rules={[
                  { rule: user.fullName.length >= 2, message: fullNameRequired },
                ]}
                showerrors={`${showErrors}`}
              />
              <FormField
                multiline
                rows={4}
                id='user-bio'
                testid='user-bio'
                className='user-bio'
                label={bioLabel}
                name='bio'
                startadornment={<Create className='adornement-icon start' />}
                onChange={this.handleChange}
                value={user.bio}
                showerrors={`${showErrors}`}
              />
              <FormField
                disabled
                id='user-email'
                testid='user-email'
                className='user-email'
                label={emailLabel}
                name='email'
                startadornment={<AssignmentInd className='adornement-icon start' />}
                onChange={this.handleChange}
                value={user.email}
              />
              <FormField
                id='user-phone'
                testid='user-phone'
                className='user-phone'
                disabled
                label={phoneNumberLabel}
                name='phone'
                startadornment={<PermDeviceInformation className='adornement-icon start' />}
                onChange={this.handleChange}
                value={user.phone}
                rules={[
                  { rule: isValidPhoneNumber(user.phone), message: phoneNumberTypeError },
                ]}
                showerrors={`${showErrors}`}
              />
              <FormField
                id='user-avatar'
                testid='user-avatar'
                className='user-avatar'
                label={avatarLabel}
                name='avatar'
                startadornment={<AccountCircle className='adornement-icon start' />}
                onChange={this.handleChange}
                value={user.avatar}
                rules={[
                  { rule: user.avatar ? isValidURL(user.avatar) : true, message: avatarTypeError },
                ]}
                showerrors={`${showErrors}`}
              />
            </div>
          </div>

          <div className='separator' id='security-settings'>{securityTitle}</div>
          <div className='profile-section'>
            <div className='left-container'>
              <div className='twofactor-auth-info-container'>
                <div className='twofactor-auth-info-title'><FormattedMessage id='profile.twofa.title' /></div>
                <div className='twofactor-auth-info-content'>
                  <div className='info-block'>
                    <FormattedMessage
                      id='profile.twofa.content'
                      values={{
                        italic: (
                          <i>
                            <FormattedMessage
                              id='profile.twofa.content.italic'
                            />
                          </i>
                        ),
                      }}
                    />
                  </div>
                  <div className='info-block'>
                    <FormattedMessage
                      id='profile.twofa.apps'
                      values={{
                        googleAuth: (
                          <a className='option-link' href='https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2'>Google Authenticator</a>
                        ),
                        hdeGen: (
                          <a className='option-link' href='https://www.hde.co.jp/otp/'>HDE OTP Generator</a>
                        ),
                        duo: (
                          <a className='option-link' href='https://duo.com/'>Duo</a>
                        ),
                      }}
                    />
                  </div>
                  <div><i><FormattedMessage id='profile.twofa.apps.italic' /></i></div>
                </div>
              </div>
            </div>
            <div className='right-container'>
              <FormField
                id='user-old-password'
                testid='user-old-password'
                label={oldPasswordLabel}
                name='oldPassword'
                inputtype={oldPasswordVisible ? 'text' : 'password'}
                startadornment={<OldPasswordIcon id='old-password-icon' test='old-password-icon' className='adornement-icon start' onClick={this.togglePasswordVisibility('oldPassword')} />}
                onChange={this.handlePasswordChange}
                value={oldPassword}
                rules={[
                  { rule: !validatePassword(oldPassword).length, message: `${passwordRequired} ${validatePassword(oldPassword).join(', ')}` },
                ]}
                showerrors={`${showErrors}`}
              />
              <div className='password-wrapper'>
                <FormField
                  id='user-new-password'
                  testid='user-new-password'
                  label={newPasswordLabel}
                  name='newPassword'
                  inputtype={newPasswordVisible ? 'text' : 'password'}
                  startadornment={<NewPasswordIcon id='new-password-icon' testid='new-password-icon' className='adornement-icon start' onClick={this.togglePasswordVisibility('newPassword')} />}
                  endadornment={
                    <Button
                      id='change-pass-btn'
                      testid='change-pass-btn'
                      className='change-pass-button'
                      variant='outlined'
                      onClick={this.changePassword}
                      disabled={validatePassword(newPassword).length > 0}
                    >
                      <FormattedMessage id='profile.passphrase.change' />
                    </Button>
                  }
                  onChange={this.handlePasswordChange}
                  value={newPassword}
                  rules={[
                    { rule: !validatePassword(newPassword).length, message: `${passwordRequired} ${validatePassword(newPassword).join(', ')}` },
                  ]}
                  showerrors={`${showErrors}`}
                />

              </div>
              <SecurityTwoFa
                intl={intl}
                method={user.method}
                confirmationCode={user.confirmationCode}
                handleChange={this.handleChange}
                handleTwoFaMethodChange={this.handleTwoFaMethodChange}
                showErrors={showErrors}
                errors={errors}
                loading={false}
                route={history.location.pathname}
                generateQRCode={generateQRCode}
                sendSMSCode={sendSMSCode}
                qrcode={TwoFA.qrcode}
                verified={TwoFA.verify}
                twoFaUpdate={twoFaUpdate}
              />
            </div>
            <div className='security-additional-options'>
              <div className='options-title'>{<FormattedMessage id='profile.additionalActions' />}</div>
              <div className='option-link' testid='show-codes-btn' onClick={this.toggleConfirmation('2fa')}>{<FormattedMessage id='profile.additionalActions.print' />}</div>
              <div className='option-link' testid='logout-btn' onClick={logout}>{<FormattedMessage id='profile.additionalActions.logout' />}</div>
              <div className='option-link' id='remove-account-trigger' testid='remove-account-btn' onClick={this.toggleConfirmation('remove')}>
                {<FormattedMessage id='profile.additionalActions.delete' />}
              </div>
            </div>
          </div>
          <DialogBox
            id={`${confirmationType === '2fa' ? '2fa' : 'remove-account'}-dialog`}
            open={confirmationOpen}
            content={this.confirmationContent(confirmationType)}
            actions={[
              <Button
                key='dialog-cancel'
                id='dialog-cancel'
                testid='dialog-cancel-btn'
                variant='outlined'
                onClick={this.toggleConfirmation(confirmationType)}
              >
                <FormattedMessage id='profile.removeaccount.cancel' />
              </Button>,
              <Button
                key={`${confirmationType === '2fa' ? '2fa' : 'remove-account'}-confirm`}
                id={`${confirmationType === '2fa' ? '2fa' : 'remove-account'}-confirm`}
                testid={`${confirmationType === '2fa' ? '2fa' : 'remove-account'}-confirm-btn`}
                variant='contained'
                color='primary'
                onClick={confirmationType === '2fa' ? this.verify2Fa : this.removeAccount}
                disabled={confirmationType === '2fa' ? (!smsSent || !code || errors.length > 0) : false}
              >
                <FormattedMessage id={`${confirmationType === '2fa' ? 'profile.twofa.dialog.confirm' : 'profile.removeaccount.remove'}`} />
              </Button>,
            ]}
          />
        </div>
      )
    )
  }
}

Profile.propTypes = {
  /**
   * `react-intl` formatting API
   * See {@link https://github.com/yahoo/react-intl/wiki/API#injection-api}
   */
  intl: object.isRequired,
  /**
   * Updates current user settings
   */
  updateUser: func.isRequired,
  /**
   * Changes user password
   */
  updatePassword: func.isRequired,
  /**
   * Deletes user account
   */
  removeAccount: func.isRequired,
  /**
   * Logged in user data
   */
  user: object.isRequired,
  /**
   * Logs out the user
   */
  logout: func.isRequired,
  /**
   * History state to get the pathname
   */
  history: object.isRequired,
  /**
   * TwoFA state to get 2fa method and qrcode
   */
  TwoFA: object.isRequired,
  /**
   * 2fa - generate QRCode function to validate 2fa update
   */
  generateQRCode: func.isRequired,
  /**
   * 2fa - send SMS code function to validate 2fa update
   */
  sendSMSCode: func.isRequired,
  /**
   * 2fa update method
   */
  twoFaUpdate: func.isRequired,
  /**
   * 2fa validation
   */
  twoFaVerify: func.isRequired,
  /**
   * Fetch recovery codes with 2FA
   */
  getCodes: func.isRequired,
}

export default Profile
