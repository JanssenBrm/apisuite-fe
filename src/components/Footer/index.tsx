import { connect } from 'react-redux'

import { Store } from 'store/types'

import Footer from './Footer'

const mapStateToProps = ({ auth, settings }: Store) => ({
  auth,
  settings,
})

export default connect(mapStateToProps)(Footer)
