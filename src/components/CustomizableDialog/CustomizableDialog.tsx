import React from 'react'

import { useTranslation } from 'react-i18next'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import InfoRoundedIcon from '@material-ui/icons/InfoRounded'
import WarningRoundedIcon from '@material-ui/icons/WarningRounded'

import { CustomizableDialogProps } from './types'

import useStyles from './styles'

import { config } from 'constants/global'

const CustomizableDialog: React.FC<CustomizableDialogProps> = ({
  // Props passed by the 'calling' component to be added below
  cancelButtonLabel,
  closeDialogCallback,
  confirmButtonCallback,
  confirmButtonLabel,
  open,
  openDialogCallback,
  optionalTitleIcon,
  providedDialogActions,
  providedDialogContent,
  providedSubText,
  providedText,
  providedTitle,

  // 'mapStateToProps' props (i.e., coming from the app's Redux 'store') to be added below (if any)
}) => {
  const classes = useStyles()

  const [t] = useTranslation()

  const handleOpenDialog = () => {
    if (openDialogCallback) openDialogCallback()
  }

  const handleCloseDialog = () => {
    if (closeDialogCallback) closeDialogCallback()
  }

  const handleConfirmAction = () => {
    confirmButtonCallback()
  }

  return (
    <Dialog
      onClose={handleCloseDialog}
      onEnter={handleOpenDialog}
      open={open}
    >
      <div className={classes.dialogTitleContainer}>
        {
          optionalTitleIcon === 'info' &&
          <InfoRoundedIcon className={classes.dialogTitleInfoIcon} />
        }

        {
          optionalTitleIcon === 'warning' &&
          <WarningRoundedIcon className={classes.dialogTitleWarningIcon} />
        }

        <DialogTitle>
          {providedTitle}
        </DialogTitle>
      </div>

      <DialogContent className={classes.dialogContentContainer}>
        <DialogContentText className={classes.dialogText}>
          {providedText}
        </DialogContentText>

        <DialogContentText className={classes.dialogSubText}>
          {providedSubText}
        </DialogContentText>

        {providedDialogContent}
      </DialogContent>

      <DialogActions className={classes.dialogActionsContainer}>
        <Button
          className={classes.cancelButton}
          fullWidth
          onClick={handleCloseDialog}
        >
          {cancelButtonLabel || t('customizableDialog.cancelButtonLabel', { config })}
        </Button>

        <div>
          <Button
            className={classes.confirmButton}
            fullWidth
            onClick={handleConfirmAction}
          >
            {confirmButtonLabel || t('customizableDialog.confirmButtonLabel', { config })}
          </Button>

          {providedDialogActions}
        </div>
      </DialogActions>
    </Dialog>
  )
}

export default CustomizableDialog
