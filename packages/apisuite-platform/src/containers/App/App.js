import React, { Component } from 'react'
import { matchPath } from 'react-router'
import { object, func } from 'prop-types'
import Footer from 'components/Footer'
import Navigation from 'components/Navigation'
import NotificationManager from 'containers/NotificationManager'
import { injectIntl } from 'react-intl'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import routes, { routesConfig } from './routes'
import Login from 'containers/Login'
import { TwoFaLoginPage, TwoFaRecoveryPage } from 'containers/TwoFactorAuthentication'
import { ForgotPassword, ResetPassword } from 'containers/Auth'
import Support from 'containers/Support'
import ModalSplit from 'components/ModalSplit'
import classnames from 'classnames'
import ReCAPTCHA from 'react-google-recaptcha'
import { THEME } from 'constants/global'
import themes from 'themes'

const RECAPTCHA_KEY = process.env.RECAPTCHA_KEY
const recaptchaRef = React.createRef()

const appTheme = themes[THEME]

const routesWithFooter = routesConfig
  .map(route => ({ path: route.path, exact: !!route.exact, footer: !!route.footer }))
  .filter(route => route.footer && route.path)

const enhancedMatchPath = (pathname) => {
  let i = routesWithFooter.length

  while (i--) {
    if (matchPath(pathname, routesWithFooter[i])) {
      return true
    }
  }

  return false
}

class App extends Component {
  state = {
    modalOpen: false,
    title: '',
    component: '',
    rightTitle: '',
    rightSubtitle: '',
    rightImg: '',
    step: 1,
    isExpanded: false,
    additionalContent: null
  }

  componentWillMount () {
    const { auth, history } = this.props
    const isRecovery = ['/recovery'].includes(history.location.pathname)

    if (auth.authToken != null) {
      this.props.userAuthLogin()
    }
    this.resetModal()
    if (isRecovery) {
      this.openLoginModal(true)
      this.openResetPasswordModal()
    }
  }

  componentWillReceiveProps (nextProps) {
    const { auth, support } = nextProps
    const { showLoginModal, showTwoFaModal } = auth.ui
    const isLoggedIn = Boolean(auth.user.id)

    if (isLoggedIn) {
      this.checkUserActivation(nextProps)
    } else {
      if (showLoginModal) {
        this.openLoginModal(true)
      }
      if (showTwoFaModal) {
        this.openTwofaModal()
      }
    }
    if (support.open) {
      this.openLoginModal(true)
      this.openSupportModal(support.option)
    }
    if (!support.open && !showLoginModal) {
      this.openLoginModal(false)
    }
  }

  checkUserActivation = (nextProps) => {
    const { auth, history } = nextProps
    const isUserActivated = auth.user.activated
    const isActivationPage = ['/activation'].includes(history.location.pathname)
    let isPathProtected = true
    const pathFound = routesConfig.filter(route => route.path === history.location.pathname)

    if (pathFound.length > 0) {
      isPathProtected = pathFound[0].protected
    }

    // Send to signup activation screen if the route is protected
    if (!isActivationPage && !isUserActivated && isPathProtected) {
      history.push('/signup')
    }
  }

  resetModal = () => {
    const { intl, history } = this.props
    this.setState({
      title: intl.formatMessage({id: 'navigation.login'}),
      component: <Login openForgotPassword={this.openForgotPasswordModal} history={history} />,
      rightTitle: intl.formatMessage({id: 'login.welcome.title'}),
      rightSubtitle: intl.formatMessage({id: 'login.welcome.subtitle'}),
      rightImg: 'thumb',
      additionalContent: null,
      step: 1
    })
  }

  openLoginModal = (open) => {
    const { pathname } = this.props.location
    this.setState({ modalOpen: open })

    if (!open) {
      this.props.resetLoginModal()

      if (this.props.auth.isBlocked && pathname !== '/signup') {
        this.props.history.replace('/')
      }
      this.resetModal()
    }
  }

  openTwofaModal = () => {
    const { intl, sendSMSCode } = this.props
    this.setState({
      title: intl.formatMessage({id: 'login.2fa.title'}),
      component: <TwoFaLoginPage sendSMSCode={sendSMSCode} openRecovery={this.openRecoveryModal} />,
      rightTitle: intl.formatMessage({id: 'login.welcome.title'}),
      rightSubtitle: intl.formatMessage({id: 'login.welcome.subtitle'}),
      step: 2
    })
  }

  openRecoveryModal = () => {
    const { intl } = this.props
    this.setState({
      title: intl.formatMessage({id: 'login.recovery.title'}),
      component: <TwoFaRecoveryPage openSupport={this.openSupportModal} />,
      rightTitle: intl.formatMessage({id: 'login.welcome.title'}),
      rightSubtitle: intl.formatMessage({id: 'login.welcome.subtitle'}),
      step: 2
    })
  }

  openForgotPasswordModal = () => {
    const { intl } = this.props
    this.setState({
      title: intl.formatMessage({id: 'login.forgotPassword.title'}),
      component: <ForgotPassword goBack={this.resetModal} />,
      rightTitle: intl.formatMessage({id: 'login.welcome.title'}),
      rightSubtitle: intl.formatMessage({id: 'login.welcome.subtitle'}),
      step: 1
    })
  }

  openResetPasswordModal = () => {
    const { intl, location } = this.props
    this.setState({
      title: intl.formatMessage({id: 'resetPassword.resetPassPhrase.label'}),
      component: <ResetPassword location={location} resetModal={this.resetModal} />,
      rightTitle: intl.formatMessage({id: 'login.welcome.title'}),
      rightSubtitle: intl.formatMessage({id: 'login.welcome.subtitle'}),
      step: 1
    })
  }

  openSupportModal = option => {
    const { intl, auth, resetCaptcha, history } = this.props
    const isLoggedIn = Boolean(auth.user.id)
    this.setState({
      title: null,
      component: <Support
        isLoggedIn={isLoggedIn}
        option={option}
        resetCaptcha={resetCaptcha}
        history={history} />,
      rightImg: 'eye',
      rightTitle: intl.formatMessage({id: 'support.title'}),
      rightSubtitle: intl.formatMessage({id: 'support.description'}),
      additionalContent: !isLoggedIn && <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={RECAPTCHA_KEY}
        onChange={this.onVerifyCaptcha}
      />,
      step: -1
    })
    this.props.openSupportModal(option)
  }

  onVerifyCaptcha = value => {
    if (value) {
      this.props.saveCaptcha(value)
    }
  }

  checkExpanded = (hasSubmenu) => {
    this.setState({
      isExpanded: hasSubmenu
    })
  }

  closeModal = () => {
    this.openLoginModal(false)
    this.props.resetSupportModal()
  }

  navigate = route => event => {
    const isFeedback = route === '/feedback'
    if (route === '/support' || isFeedback) {
      this.openLoginModal(true)
      this.openSupportModal(isFeedback ? 'incident' : undefined)
    } else {
      this.props.history.push(route)
    }
  }

  renderNav () {
    const { auth, logout } = this.props
    const { user } = auth
    const isLoggedIn = Boolean(user.id)
    const isUserActivated = user.activated

    return (
      <Navigation key='navigation'
        {
        ...{
          isLoggedIn,
          isUserActivated,
          logout,
          openLoginModal: () => this.openLoginModal(true),
          openSupportModal: (option) => {
            this.openLoginModal(true)
            this.openSupportModal(option)
          },
          checkExpanded: (hasSubmenu) => this.checkExpanded(hasSubmenu)
        }}
      />
    )
  }

  renderNotifications () {
    return (<NotificationManager />)
  }

  render () {
    const { intl, logout, auth, history } = this.props
    const { modalOpen, title, component, rightTitle, rightSubtitle, rightImg, step, isExpanded, additionalContent } = this.state
    const hasTransparentBG = ['/', '/dashboard', '/recovery'].includes(history.location.pathname)

    return (
      <MuiThemeProvider theme={createMuiTheme(appTheme)}>
        {this.renderNotifications()}
        {this.renderNav()}
        <div className={classnames('route-wrapper', {
          'default-spacing': !hasTransparentBG,
          'expanded': isExpanded && !hasTransparentBG
        })}>
          {routes()}
        </div>

        {enhancedMatchPath(location.pathname) && <Footer intl={intl} user={auth.user} navigate={this.navigate} logout={logout} />}

        <ModalSplit
          open={modalOpen}
          onClose={this.closeModal}
          title={title}
          component={component}
          rightTitle={rightTitle}
          rightSubtitle={rightSubtitle}
          rightImg={rightImg}
          additionalContent={additionalContent}
          step={step}
        />
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  auth: object.isRequired,
  userAuthLogin: func.isRequired,
  logout: func.isRequired,
  intl: object.isRequired,
  resetLoginModal: func,
  history: object.isRequired,
  location: object.isRequired,
  support: object.isRequired,
  openSupportModal: func.isRequired,
  resetSupportModal: func.isRequired,
  saveCaptcha: func.isRequired,
  resetCaptcha: func.isRequired,
  sendSMSCode: func.isRequired
}

export default injectIntl(App)
