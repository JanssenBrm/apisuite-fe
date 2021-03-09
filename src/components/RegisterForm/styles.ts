import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

const useStyles = makeStyles(({
  registerContainer: {
    width: '100%',
    height: '100%',
  },
  fieldContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  textField: {
    backgroundColor: 'white',
    borderRadius: config.dimensions.borderRadius,
    color: config.palette.greyScales[400],
  },
  centerContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    color: 'red',
    fontWeight: 500,
  },
  loading: {
    color: config.palette.primary,
  },

}))

export default useStyles
