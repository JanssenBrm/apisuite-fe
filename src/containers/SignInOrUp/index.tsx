import { connect } from 'react-redux'

import { Store } from 'store/types'

import SignInOrUp from './SignInOrUp'

const mapStateToProps = ({ settings }: Store) => ({
  settings: settings,
})

export default connect(mapStateToProps, null)(SignInOrUp)
