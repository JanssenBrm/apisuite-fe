import React from 'react'

// Component imports
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '../Button'

// 'Type' imports
import { CustomizableDialogProps } from './types'

// Styling imports
import useStyles from './styles'

const CustomizableDialog: React.FC<CustomizableDialogProps> = ({
  // Props passed by the 'calling' component to be added below
  open,
  providedTitle,
  providedText,
  providedDialogContent,
  confirmButtonLabel,
  cancelButtonLabel,
  openDialogCallback,
  closeDialogCallback,
  confirmButtonCallback,
  confirmButtonProps,
  cancelButtonProps,
  providedDialogActions,

  // 'mapStateToProps' props (i.e., coming from the app's Redux 'store') to be added below (if any)
}) => {
  const classes = useStyles()

  function handleOpenDialog () {
    if (openDialogCallback) openDialogCallback()
  }

  function handleCloseDialog () {
    if (closeDialogCallback) closeDialogCallback()
  }

  function handleConfirmAction () {
    confirmButtonCallback()
  }

  return (
    <Dialog
      open={open}
      onEnter={handleOpenDialog}
      onClose={handleCloseDialog}
    >
      <DialogTitle>{providedTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {providedText}
        </DialogContentText>

        {providedDialogContent}
      </DialogContent>

      <DialogActions>
        <Button
          label={cancelButtonLabel || 'Cancel'}
          onClick={handleCloseDialog}
          background='transparent'
          color='primary'
          fullWidth
          {...cancelButtonProps}
        />

        <div className={classes.confirmWrapper}>
          <Button
            label={confirmButtonLabel || 'Confirm'}
            onClick={handleConfirmAction}
            fullWidth
            {...confirmButtonProps}
          />

          {providedDialogActions}
        </div>
      </DialogActions>
    </Dialog>
  )
}

export default CustomizableDialog
