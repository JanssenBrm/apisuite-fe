
import { connect } from 'react-redux'
import { signupUser, signupOrganization, signupSecurity, sendActivationEmail, generateQRCode, sendSMSCode, skipStep, resetSignup } from './ducks'
import { getInvitation, acceptInvitation, postponeInvitation } from '../Team/ducks'
import { openLoginModal } from 'containers/Auth/ducks'
import Signup from './Signup'
import PersonalDetailsComponent from './PersonalDetails'
import OrganisationDetailsComponent from './OrganisationDetails'
import SecuritySetupComponent from './SecuritySetup'
import SuccessPageComponent from './SuccessPage'
import ActivationPageComponent from './ActivationPage'
import InvitationPageComponent from './InvitationPage'
import { injectIntl } from 'react-intl'

const mapStateToProps = ({ auth, signup, team }) => ({ ui: signup.ui, auth, signup, user: signup.user, invitation: team.ticket })

const mapDispatchToProps = (dispatch) => ({
  signupUser: userData => dispatch(signupUser(userData)),
  signupOrganization: organizationData => dispatch(signupOrganization(organizationData)),
  signupSecurity: securityData => dispatch(signupSecurity(securityData)),
  openLoginModal: () => dispatch(openLoginModal()),
  sendActivationEmail: (email, userID) => dispatch(sendActivationEmail(email, userID)),
  sendSMSCode: () => dispatch(sendSMSCode()),
  generateQRCode: () => dispatch(generateQRCode()),
  skipStep: () => dispatch(skipStep()),
  resetSignup: () => dispatch(resetSignup()),
  getInvitation: (invId) => dispatch(getInvitation(invId)),
  acceptInvitation: (invId) => dispatch(acceptInvitation(invId)),
  postponeInvitation: (invId) => dispatch(postponeInvitation(invId))
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Signup))

const successMapStateToProps = ({ signup, team }) => ({ user: signup.user, invitation: team.ticket })

const successMapDispatchToProps = (dispatch) => ({
  openLoginModal: () => dispatch(openLoginModal()),
  sendActivationEmail: (email, userId) => dispatch(sendActivationEmail(email, userId))
})

export const PersonalDetails = PersonalDetailsComponent
export const OrganisationDetails = OrganisationDetailsComponent
export const SecuritySetup = SecuritySetupComponent
export const SuccessPage = injectIntl(connect(successMapStateToProps, successMapDispatchToProps)(SuccessPageComponent))
export const ActivationPage = ActivationPageComponent
export const InvitationPage = InvitationPageComponent
