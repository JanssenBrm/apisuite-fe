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
  rejectButton: {
    backgroundColor: 'white',
    border: `1px solid ${config.palette.greyScales[400]}`,
    borderRadius: config.dimensions.borderRadius,
    color: config.palette.greyScales[800],
    fontSize: '16px',
    fontWeight: 500,
    textTransform: 'none',
  },
  textField: {
    backgroundColor: 'white',
    borderRadius: config.dimensions.borderRadius,
    fontSize: '16px',
    fontWeight: 500,
    '& div > input': {
      color: config.palette.greyScales[400] + ' !important',
    },
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
  ssoSignIcon: {
    fontSize: '25px',
    left: '20px',
    position: 'absolute',
    top: '11.5px',
  },
}))

export default useStyles
