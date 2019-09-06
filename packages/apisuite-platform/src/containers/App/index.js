
import { connect } from 'react-redux'
import { getMe, logout, resetLoginModal, meSendSMSCode } from 'containers/Auth/ducks'
import App from './App'
import { openSupportModal, resetSupportModal, saveCaptcha, resetCaptcha } from 'containers/Support/ducks'

const mapStateToProps = ({ auth, support }) => ({ auth, support })

const mapDispatchToProps = (dispatch) => ({
  userAuthLogin: () => dispatch(getMe()),
  logout: () => dispatch(logout()),
  resetLoginModal: () => dispatch(resetLoginModal()),
  openSupportModal: option => dispatch(openSupportModal(option)),
  resetSupportModal: () => dispatch(resetSupportModal()),
  saveCaptcha: value => dispatch(saveCaptcha(value)),
  resetCaptcha: () => dispatch(resetCaptcha()),
  sendSMSCode: () => dispatch(meSendSMSCode())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
