import { connect } from 'react-redux'

import SignInOrUp from './SignInOrUp'
import { Store } from 'store/types'

const mapStateToProps = ({ auth, invitation }: Store) => ({
  auth,
  invitation,
})

export default connect(mapStateToProps, null)(SignInOrUp)
