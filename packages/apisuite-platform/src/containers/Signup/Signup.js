import React, { Component } from 'react'
import { func, object } from 'prop-types'
import checkImage from 'assets/check.svg'
import securityOval from 'assets/security_oval.svg'
import CircularProgress from '@material-ui/core/CircularProgress'
import PersonalDetails from './PersonalDetails'
import OrganisationDetails from './OrganisationDetails'
import SecuritySetup from './SecuritySetup'
import ActivationPage from './ActivationPage'
import InvitationPage from './InvitationPage'
import Stepper from 'components/Stepper'
import { Typography } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import qs from 'qs'

const defaultSteps = [
  { name: 'Personal Details' },
  { name: 'Organisation Details' },
  { name: 'Security Step' },
]

const invitationSteps = [
  { name: 'Sign up Invitation' },
  { name: 'Personal Details' },
  { name: '2-Factor Authentication' },
]

class Signup extends Component {
  state = {
    showErrors: false,
    form: {
      fullName: '',
      email: '',
      confirmEmail: '',
      phoneNumber: '',
      position: '',
      organisationName: '',
      vat: '',
      website: '',
      password: '',
      terms: false,
      privacy: false,
      method: '',
      confirmationCode: '',
    },
    errors: [],
    step: 1,
    qrcode: '',
  }

  componentWillReceiveProps (nextProps) {
    const { signup } = nextProps
    if (this.props.signup !== nextProps.signup) {
      this.setState({ step: signup.step, error: signup.error, qrcode: signup.qrcode })
    }
  }

  componentDidMount () {
    this.props.resetSignup()
  }

  nextStep = (fields) => {
    const { step, form } = this.state
    const { signupUser, signupOrganization, signupSecurity, invitation } = this.props
    const isInvitation = invitation.invitationCode
    const { terms, privacy, confirmEmail, ...data } = fields

    switch (step) {
      case 1:
        signupUser(data)
        break
      case 2:
        isInvitation ? signupUser(data) : signupOrganization(fields)
        break
      case 3:
        signupSecurity(fields)
        break
    }

    this.setState({
      form: { ...form, ...fields },
    })
  }

  previousStep = (fields) => {
    const { step, form } = this.state
    if (step === 1) { return }

    this.setState({
      form: { ...form, ...fields },
    })
  }

  navigate = route => event => this.props.history.push(route)

  handleSubmit = (fields) => {
    this.nextStep(fields)
  }

  render () {
    const {
      ui,
      intl,
      openLoginModal,
      auth,
      sendActivationEmail,
      signupSecurity,
      signup,
      skipStep,
      history,
      sendSMSCode,
      generateQRCode,
      location,
      invitation,
      getInvitation,
      acceptInvitation,
      postponeInvitation,
    } = this.props
    const { step, form, qrcode } = this.state
    const isLoggedIn = Boolean(auth.user.id)
    const isUserActivated = auth.user.activated
    const isTwoFaModal = auth.showTwoFaModal
    const query = qs.parse(location.search, { ignoreQueryPrefix: true })
    const isInvitation = query.ticket || invitation.invitationCode

    return (
      <div className='signup-container'>
        {isLoggedIn && !isUserActivated && !isTwoFaModal
          ? <ActivationPage
            intl={intl}
            openLoginModal={openLoginModal}
            sendActivationEmail={sendActivationEmail}
            auth={auth}
          />
          : <div>
            <div className='signup-steps-wrapper'>
              <div className='signup-steps'>
                <Stepper steps={isInvitation ? invitationSteps : defaultSteps} currentStep={step} />
              </div>
            </div>
            <div className='signup-content'>
              {step !== 4 &&
                <div className='signup-wrapper'>
                  <div className='signup-form'>
                    {((step === 1 && !isInvitation) || (step === 2 && isInvitation)) &&
                      <PersonalDetails
                        ui={ui}
                        nextStep={this.nextStep}
                        intl={intl}
                        goToTerms={this.navigate('/terms')}
                        goToPrivacy={this.navigate('/privacy')}
                        error={signup.error}
                        invitation={invitation}
                      />}
                    {step === 1 && isInvitation &&
                      <InvitationPage
                        intl={intl}
                        history={history}
                        invitation={invitation}
                        location={location}
                        getInvitation={getInvitation}
                        acceptInvitation={acceptInvitation}
                        postponeInvitation={postponeInvitation}
                        skipStep={skipStep}
                        error={signup.error}
                      />}
                    {step === 2 && !isInvitation &&
                      <OrganisationDetails
                        ui={ui}
                        nextStep={this.nextStep}
                        previousStep={this.previousStep}
                        skipStep={skipStep}
                        intl={intl}
                        error={signup.error}
                      />}
                    {step === 3 &&
                      <SecuritySetup
                        ui={ui}
                        handleSubmit={this.handleSubmit}
                        previousStep={this.previousStep}
                        intl={intl}
                        email={form.email}
                        number={form.phoneNumber}
                        sendSecurityDetails={signupSecurity}
                        qrcode={qrcode}
                        error={signup.error}
                        generateQRCode={generateQRCode}
                        sendSMSCode={sendSMSCode}
                        route={history.location.pathname}
                      />}
                  </div>
                  <div className='signup-info-wrapper'>
                    <div className='signup-info-content'>
                      <div className='signup-check'>
                        <img src={checkImage} />
                      </div>
                      {(step === 1 || step === 2) &&
                        <div>
                          <Typography variant='display3' gutterBottom className='signup-info-title'><FormattedMessage id='signup.intro.title' /></Typography>
                          <p>
                            <FormattedMessage id='signup.intro.text1' />
                          </p>
                          <p>
                            <FormattedMessage id='signup.intro.text2' />
                          </p>
                        </div>}
                      {step === 3 &&
                        <div>
                          <Typography variant='display3' gutterBottom className='signup-info-title'>2-Factor Authentication</Typography>
                          <p>
                            <FormattedMessage id='signup.intro.security.1' /> <br />
                            <FormattedMessage id='signup.intro.security.2' /> <br />
                            <FormattedMessage id='signup.intro.security.3' />
                          </p>
                          <div className='signup-help'>
                            <FormattedMessage id='signup.security.help' />
                            <img className='help-img' src={securityOval} />
                          </div>
                        </div>}
                    </div>
                  </div>
                </div>}
              {step === 4 &&
                <div id='signup-loading' className='signup-loading'>
                  <p><FormattedMessage id='signup.createAccount' /></p>
                  <CircularProgress className='signup-loading-circle' />
                </div>}
            </div>
          </div>}
      </div>
    )
  }
}

Signup.propTypes = {
  intl: object.isRequired,
  ui: object.isRequired,
  history: object.isRequired,
  location: object.isRequired,
  invitation: object.isRequired,
  openLoginModal: func.isRequired,
  auth: object.isRequired,
  sendActivationEmail: func.isRequired,
  signup: object.isRequired,
  signupUser: func.isRequired,
  signupOrganization: func.isRequired,
  signupSecurity: func.isRequired,
  sendSMSCode: func.isRequired,
  generateQRCode: func.isRequired,
  skipStep: func.isRequired,
  resetSignup: func.isRequired,
  getInvitation: func.isRequired,
  acceptInvitation: func.isRequired,
  postponeInvitation: func.isRequired,
}

export default Signup
