import { connect } from 'react-redux'
import NotificationManager from './NotificationManager'
import { hideNotification } from './ducks'

const mapStateToProps = ({ notifications }) => ({ ...notifications })
const mapDispatchToProps = (dispatch) => ({
  hideNotification: () => dispatch(hideNotification()),
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationManager)
