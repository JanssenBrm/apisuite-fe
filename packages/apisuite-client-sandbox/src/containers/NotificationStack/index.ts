import { connect } from 'react-redux'
import { Store } from 'store/types'
import NotificationStack from './NotificationStack'
import { Dispatch } from 'redux'
import { closeNotification } from './ducks'

const mapStateToProps = ({ notifications }: Store) => ({
  notifications: notifications.notifications,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeNotification: (notificationNumber: number) => dispatch(closeNotification(notificationNumber)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationStack)
