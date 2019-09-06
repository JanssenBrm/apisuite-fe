import React from 'react'
import PropTypes, { number, string, bool, func } from 'prop-types'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import WarningIcon from '@material-ui/icons/Warning'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
}

const PopMessageContent = (props) => {
  const { className, message, onClose, variant, ...other } = props
  const Icon = variantIcon[variant]

  return (
    <SnackbarContent
      className='content-container'
      aria-describedby='client-snackbar'
      message={
        <span id='client-snackbar' className='content-message'>
          <Icon className={`icon ${variant} icon-variant`} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key='close'
          aria-label='Close'
          color='inherit'
          className={`close ${variant}`}
          onClick={onClose}
        >
          <CloseIcon className='icon' />
        </IconButton>
      ]}
      {...other}
    />
  )
}

PopMessageContent.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info'])
}

const PopMessage = ({ open, message, handleClose, variant, duration, vertical, horizontal }) =>
  <Snackbar className='pop-message'
    anchorOrigin={{
      vertical: vertical,
      horizontal: horizontal
    }}
    open={open}
    autoHideDuration={duration}
    onClose={handleClose}
  >
    <PopMessageContent
      onClose={handleClose}
      variant={variant}
      message={message}
    />
  </Snackbar>

PopMessage.defaultProps = {
  open: false,
  duration: 2000,
  message: '',
  vertical: 'top',
  horizontal: 'center',
  variant: 'info',
  handleClose: () => {}
}

PopMessage.propTypes = {
  open: bool,
  duration: number,
  message: string,
  vertical: string,
  horizontal: string,
  variant: string,
  handleClose: func
}

export default PopMessage
