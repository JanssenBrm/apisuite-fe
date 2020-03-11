import { connect } from 'react-redux'
import { Store } from 'store/types'
import Notification from './Notification'
import { Dispatch } from 'redux'
import { closeNotification } from './ducks'

const mapStateToProps = ({ notification }: Store) => ({
  open: notification.open,
  type: notification.type,
  msg: notification.msg,
  timer: notification.timer,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeNotification: () => dispatch(closeNotification()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
