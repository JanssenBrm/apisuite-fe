import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

const useStyles = makeStyles(({
  loginWithContainer: {
    width: '100%',
    minHeight: '200px',
  },
  loginWithButtonWrapper: {
    marginBottom: '10px',
    color: config.palette.greyScales[400],
  }
}))

export default useStyles
