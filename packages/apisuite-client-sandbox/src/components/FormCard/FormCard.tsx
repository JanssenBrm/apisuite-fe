import * as React from 'react'
import { FormCardProps } from './types'
import useStyles from './styles'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const iconStyle = {
  height: '42px',
  width: '42px',
}

const FormCard: React.FC<FormCardProps> = ({
  title,
  buttonLabel,
  closeRoute,
  buttonDisabled,
  handleSubmit,
  loading,
  children,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.formCard}>
      <a href={closeRoute}>
        <CloseIcon
          className={classes.closeIcon}
          style={iconStyle}
        />
      </a>
      <h2 className={classes.formTitle}>{title}</h2>
      <form onSubmit={handleSubmit}>
        {children}
        <Button
          type='submit'
          variant='outlined'
          disabled={buttonDisabled || loading}
          className={classes.submitBtn}
        >
          {buttonLabel}
          {loading && <CircularProgress size={24} className={classes.loading} />}
        </Button>
      </form>
    </div>
  )
}

export default FormCard
