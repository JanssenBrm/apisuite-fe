import * as React from 'react'
import useStyles from './styles'
import Button from '@material-ui/core/Button'
import { isValidEmail } from 'components/FormField'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'
import { InformDialogProps } from './types'

const InformDialog: React.FC<InformDialogProps> = (
  { open, inform, requesting, closeInform },
) => {
  const classes = useStyles()
  const showLoading = requesting
  const [email, setEmail] = React.useState('')
  const [isValid, setIsValid] = React.useState(true)
  const [pass, setPass] = React.useState(false)
  const textTarget = 'Whoah! We\'re not quite there yet but we promise to let you know the minute we launch the full product version!'
  const titleTarget = 'Keep me posted'
  const idleTime = 2000

  React.useEffect(() => {
    if (open) {
      setEmail('')
      setIsValid(true)
      setPass(false)
    }
  }, [open])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    setPass(true)
    if (isValidEmail(event.target.value)) setIsValid(true)
  }

  React.useEffect(() => {
    const timer = setInterval((newEmail) => {
      if (pass) setIsValid(isValidEmail(newEmail))
    }, idleTime, email)
    return () => {
      clearInterval(timer)
    }
  }, [email, pass])

  function handleConfirm () {
    inform({
      email: email,
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
            label='Email Address'
            value={email}
            error={!isValid}
            helperText={!isValid && 'Please enter a valid email address.'}
            onChange={handleChange}
            margin='dense'
            type='email'
            variant='outlined'
            fullWidth
            autoFocus
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
            disabled={!isValidEmail(email) || showLoading}
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
