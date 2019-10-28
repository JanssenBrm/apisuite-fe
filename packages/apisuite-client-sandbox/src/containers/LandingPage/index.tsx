import { connect } from 'react-redux'
import LandingPage from './LandingPage'
import selector from './selector'

export default connect(selector)(LandingPage)
