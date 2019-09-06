import { connect } from 'react-redux'
import Profile from './Profile'
import { updateUser, updatePassword, removeAccount, logout, meSendSMSCode, meGenerateQRCode, twoFaUpdate, twoFaVerify } from '../Auth/ducks'
import { fetchOrganizations, updateOrganization, getOnboardingToken } from './ducks'
import { getCodes } from '../RecoveryCodes/ducks'
import OrganisationSectionComponent from './OrganisationSection'
import { injectIntl } from 'react-intl'

const mapStateToProps = ({ auth, recovery }) => ({
  user: auth.user,
  TwoFA: auth.TwoFA,
  codes: recovery.codes
})
const mapDispatchToProps = (dispatch) => ({
  updateUser: (userData) => dispatch(updateUser(userData)),
  updatePassword: (passwordData) => dispatch(updatePassword(passwordData)),
  removeAccount: (userId) => dispatch(removeAccount(userId)),
  sendSMSCode: () => dispatch(meSendSMSCode()),
  generateQRCode: () => dispatch(meGenerateQRCode()),
  twoFaUpdate: (twoFAData) => dispatch(twoFaUpdate(twoFAData)),
  twoFaVerify: (pass) => dispatch(twoFaVerify(pass)),
  logout: () => dispatch(logout()),
  getCodes: (pass) => dispatch(getCodes(pass))
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Profile))

const organisationSectionMapDispatchToProps = (dispatch) => ({
  fetchOrganizations: () => dispatch(fetchOrganizations()),
  updateOrganization: (id, data) => dispatch(updateOrganization(id, data)),
  getOnboardingToken: () => dispatch(getOnboardingToken())
})

export const OrganisationSection = injectIntl(connect(({ organizations }) => ({ organisation: organizations.data[0], onboardingToken: organizations.onboardingToken }), organisationSectionMapDispatchToProps)(OrganisationSectionComponent))
