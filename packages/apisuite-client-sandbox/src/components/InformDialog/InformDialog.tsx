import * as React from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider, makeStyles } from '@material-ui/styles'
import { blue, amber } from '@material-ui/core/colors'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import CircularProgress from '@material-ui/core/CircularProgress'

import { InformDialogProps } from './types'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2DB7BA' },
    secondary: { main: '#035E86' },
  },
  spacing: (factor: number) => 8 * factor,
})

const useStyles = makeStyles({
  textField: {
    marginBottom: 18,
  },
  formGroup: {
    paddingLeft: 8,
  },
  confirmWrapper: {
    margin: theme.spacing(1),
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
  terms: true,
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
  { open, textTarget, onCancel, onConfirm, showLoading, error, ...props }
) => {
  const classes = useStyles()
  const [values, setValues] = React.useState(defaultValues)

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

    newValues.valid = newValues.terms && !!newValues.email && !newValues.errorHelper

    setValues(newValues)
  }

  // const handleCheck = (name: 'terms') => ({ target: { checked } }: any) => {
  //   const newValues = { ...values, [name]: checked }

  //   newValues.valid = newValues.terms && !!newValues.email && !newValues.errorHelper

  //   setValues(newValues)
  // }

  function handleConfirm () {
    if (values.valid) {
      onConfirm(values.email)
    }
  }

  function preventDefault (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog data-testid='inform-dialog' open={open} {...props}>
        <DialogTitle>Keep me posted</DialogTitle>
        <DialogContent>
          <DialogContentText data-testid='inform-dialog-text'>
            Whoah! We're not quite there yet but we promise to let you know the minute we launch the full product version!
            <br/><br/>
            Let us know where to send updates to.
          </DialogContentText>

          <form noValidate autoComplete='off' onSubmit={preventDefault}>
            <TextField
              data-testid='inform-dialog-email'
              className={classes.textField}
              label='Email Address'
              value={values.email}
              error={!!values.errorHelper || !!error}
              helperText={values.errorHelper || error}
              onChange={handleChange('email')}
              margin='dense'
              type='email'
              variant='outlined'
              fullWidth
              autoFocus
              disabled={showLoading}
            />

            {/* <FormGroup row className={classes.formGroup}>
              <FormControlLabel
                label={
                  <>
                    * I accept the <Link target='_blank' href='/terms'>terms & conditions</Link>
                  </>
                }
                control={
                  <Checkbox
                    data-testid='inform-dialog-terms'
                    checked={values.terms}
                    onChange={handleCheck('terms')}
                    color='primary'
                    disabled={showLoading}
                  />
                }
              />
            </FormGroup> */}
          </form>
        </DialogContent>

        <DialogActions>
          <Button
            data-testid='inform-dialog-cancel'
            color='primary'
            onClick={onCancel}
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
    </ThemeProvider>
  )
}

export default InformDialog
