import * as React from 'react'
import useStyles from './styles'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import TextField from '@material-ui/core/TextField'

const PasswordCard: React.FC<{}> = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const classes = useStyles()

  function handleClickShowPassword () {
    setShowPassword(!showPassword)
  }

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <div className={classes.text}>Pass-phrase</div>
        <div className={classes.iconsContainer}>
          <IconButton
            aria-label='toggle password visibility'
            onClick={handleClickShowPassword}
            edge='end'
            className={classes.icon}
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
          <IconButton
            aria-label='toggle password visibility'
            edge='end'
            className={classes.icon}
          >
            <FileCopyOutlinedIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes.bottom}>
        <TextField
          type={showPassword ? 'text' : 'password'}
          variant='outlined'
          className={classes.password}
          fullWidth
        />
        <p className={classes.text2}>Use the pass-phrase to authorise [Nikolas Tesla] in the sandbox</p>
      </div>
    </div>
  )
}

export default PasswordCard
