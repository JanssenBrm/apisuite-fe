import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

export default makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    '& .MuiAlert-standardInfo': {
      backgroundColor: config.palette.alert.success.background,
    },
    '& .MuiInputBase-root.MuiInputBase-formControl': {
      backgroundColor: theme.palette.common.white,
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: theme.palette.focus?.main || theme.palette.primary.main,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.focus?.main || theme.palette.primary.main,
    },
  },
}))
