import React from 'react'
import { string, node, array, bool, func } from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const DialogBox = ({ title, content, actions, open, onClose, ...rest }) => (
  <div className='dialogBox'>
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='form-dialog-title'
      {...rest}
    >
      {title && <DialogTitle id='form-dialog-title'><p>{title}</p></DialogTitle>}
      {content && <DialogContent>{content}</DialogContent>}
      {actions && <DialogActions>{actions.map((action, key) => <div className='dialog-action' key={key}>{action}</div>)}</DialogActions>}
    </Dialog>
  </div>
)

DialogBox.defaultProps = {
  open: false,
  onClose: () => {},
}

DialogBox.propTypes = {
  title: string,
  content: node,
  actions: array,
  open: bool.isRequired,
  onClose: func,
}

export default DialogBox
