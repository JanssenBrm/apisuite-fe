import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

export default makeStyles(({
  root: {
    height: '100%',
    '& .MuiAlert-standardInfo': {
      backgroundColor: config.palette.alert.success.background,
    },
  },
}))
