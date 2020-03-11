import * as React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import { TransitionProps } from '@material-ui/core/transitions'
import Slide from '@material-ui/core/Slide'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined'
import { NotificationProps } from './types'
import useStyles from './styles'
import clsx from 'clsx'

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition (props, ref) {
  return <Slide direction='down' ref={ref} {...props} />
})

const Notification: React.FC<NotificationProps> = ({ open, type, msg, closeNotification, timer }) => {
  const classes = useStyles()

  React.useEffect(() => {
    if (open) setTimeout(() => closeNotification(), timer)
  }, [open])

  const typeIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleOutlineOutlinedIcon fontSize='inherit' />
      case 'error':
        return <CancelOutlinedIcon fontSize='inherit' />
      default:
        return null
    }
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      classes={{
        paperScrollPaper: classes.paper,
      }}
      BackdropProps={{
        classes: {
          root: classes.backDrop,
        },
      }}
    >
      <DialogContent
        className={clsx(
          classes.content,
          type === 'success' && classes.success,
          type === 'error' && classes.error)}
      >
        <div className={classes.icon}>
          {typeIcon()}
        </div>
        <DialogContentText
          className={clsx(
            classes.text,
            type === 'success' && classes.success,
            type === 'error' && classes.error)}
        >
          {msg}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default Notification
