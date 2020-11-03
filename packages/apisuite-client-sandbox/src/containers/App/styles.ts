import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

export default makeStyles(({
  root: {
    '& .MuiAlert-standardInfo': {
      backgroundColor: config.palette.alert.success.background,
    },
  },
}))
