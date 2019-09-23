import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import withTheme from 'components/ThemeContext/withTheme'
import Navigation from './Navigation'

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(
  withRouter(
    withTheme(Navigation)
  )
)
