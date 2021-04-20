import { connect } from 'react-redux'

import { Store } from 'store/types'

import SignInOrUp from './SignInOrUp'

const mapStateToProps = ({ auth, settings, invitation }: Store) => ({
  auth,
  invitation,
  settings: settings,
})

export default connect(mapStateToProps, null)(SignInOrUp)
