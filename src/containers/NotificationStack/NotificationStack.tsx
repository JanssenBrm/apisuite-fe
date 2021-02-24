import * as React from 'react'
import Notification from 'components/Notification'
import { NotificationStackProps } from './types'
import useStyles from './styles'

const NotificationStack: React.FC<NotificationStackProps> = ({
  notifications,
  closeNotification,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.stack}>
      {notifications.map((notification, indx) => (
        <Notification
          key={indx}
          open={notification.open}
          type={notification.type}
          msg={notification.msg}
          timer={notification.timer}
          notificationNumber={notification.notificationNumber}
          closeNotification={closeNotification}
        />
      ))}
    </div>
  )
}

export default NotificationStack
