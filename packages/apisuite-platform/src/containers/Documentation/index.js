import { connect } from 'react-redux'
import Documentation from './Documentation'
import { changeTopic } from './ducks'
import withTheme from 'components/ThemeContext/withTheme'

const mapStateToProps = ({ auth, documentation }) => ({ auth, documentation })
const mapDispatchToProps = (dispatch) => ({
  changeTopic: (topic, child) => dispatch(changeTopic(topic, child)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Documentation))
