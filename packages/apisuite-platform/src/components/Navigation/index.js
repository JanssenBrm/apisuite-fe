import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import withTheme from 'components/ThemeContext/withTheme'
import Navigation from './Navigation'
import { changeTopic } from 'containers/Documentation/ducks'

const mapStateToProps = ({ documentation, auth }) => ({ documentation, auth })
const mapDispatchToProps = (dispatch) => ({
  changeTopic: (topic, child) => dispatch(changeTopic(topic, child))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(
    withTheme(Navigation)
  )
)
