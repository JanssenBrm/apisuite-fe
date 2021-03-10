import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

const useStyles = makeStyles(({
  ssoFormContainer: {
    marginTop: '40px',
  },

  ssoSignInWithButtonContainer: {
    marginBottom: '25px',
    width: '100%',
  },

  ssoSignInWithButton: {
    backgroundColor: config.palette.primary,
    color: `${config.palette.primaryContrastText} !important`,
    fontSize: '16px',
    fontWeight: 500,
    padding: '7.5px 45px',
    textTransform: 'none',
    width: '100%',

    '&:hover': {
      backgroundColor: config.palette.primary,
    },
  },

  ssoSignInWithIcon: {
    fontSize: '25px',
    left: '20px',
    position: 'absolute',
    top: '11.5px',
  },
}))

export default useStyles
