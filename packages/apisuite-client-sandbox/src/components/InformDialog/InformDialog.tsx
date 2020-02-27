import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
// import FormGroup from '@material-ui/core/FormGroup'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import Checkbox from '@material-ui/core/Checkbox'
// import Link from '@material-ui/core/Link'
import CircularProgress from '@material-ui/core/CircularProgress'

import { InformDialogProps } from './types'

const useStyles = makeStyles({
  textField: {
    marginBottom: 18,
  },
  formGroup: {
    paddingLeft: 8,
  },
  confirmWrapper: {
    // margin: theme.spacing(1),
    position: 'relative',
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
})

const defaultValues = {
  email: '',
  // terms: false,
  valid: false,
  errorHelper: '',
}

const getEmailError = (value: string) => {
  if (/\S+@\S+\.\S+/.test(value)) {
    return ''
  }

  return '* A valid emails must be provided'
}

const InformDialog: React.FC<InformDialogProps> = (
  { open, inform, requesting, closeInform },
) => {
  const classes = useStyles()
  const showLoading = requesting
  const [values, setValues] = React.useState(defaultValues)
  const textTarget = "Whoah! We're not quite there yet but we promise to let you know the minute we launch the full product version!"
  const titleTarget = 'Keep me posted'

  React.useEffect(() => {
    if (open) {
      setValues(defaultValues)
    }
  }, [open])

  const handleChange = (name: 'email') => ({ target: { value } }: any) => {
    const newValues = { ...values, [name]: value }

    if (name === 'email') {
      newValues.errorHelper = getEmailError(value)
    }

    newValues.valid = !!newValues.email && !newValues.errorHelper

    setValues(newValues)
  }

  function handleConfirm () {
    inform({
      email: values.email,
      target: 'portal',
    })
  }

  function handleClose () {
    closeInform()
  }

  function preventDefault (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <Dialog data-testid='inform-dialog' open={open}>
      <DialogTitle>{titleTarget}</DialogTitle>
      <DialogContent>
        <DialogContentText data-testid='inform-dialog-text'>
          {textTarget}
        </DialogContentText>

        <form noValidate autoComplete='off' onSubmit={preventDefault}>
          <TextField
            data-testid='inform-dialog-email'
            className={classes.textField}
            label='Email Address'
            value={values.email}
            error={!!values.errorHelper}
            helperText={values.errorHelper}
            onChange={handleChange('email')}
            margin='dense'
            type='email'
            variant='outlined'
            fullWidth
            autoFocus
            // disabled={showLoading}
          />
        </form>
      </DialogContent>

      <DialogActions>
        <Button
          data-testid='inform-dialog-cancel'
          color='primary'
          onClick={handleClose}
          disabled={showLoading}
        >
            Cancel
        </Button>

        <div className={classes.confirmWrapper}>
          <Button
            data-testid='inform-dialog-submit'
            color='primary'
            onClick={handleConfirm}
            disabled={!values.valid || showLoading}
          >
              Submit
          </Button>

          {showLoading && <CircularProgress size={24} className={classes.progress} />}
        </div>
      </DialogActions>
    </Dialog>
  )
}

export default InformDialog
