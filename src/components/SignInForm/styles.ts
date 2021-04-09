import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

const useStyles = makeStyles(({
  disabledConfirmButton: {
    backgroundColor: config.palette.label,
    color: `${config.palette.primaryContrastText} !important`,
    fontSize: '16px',
    fontWeight: 500,
    padding: '7.5px 45px',
    pointerEvents: 'none',
    textTransform: 'none',
    width: '100%',

    '&:hover': {
      backgroundColor: config.palette.label,
    },
  },

  enabledConfirmButton: {
    backgroundColor: config.palette.tertiary,
    color: `${config.palette.primaryContrastText} !important`,
    fontSize: '16px',
    fontWeight: 500,
    padding: '7.5px 45px',
    textTransform: 'none',
    width: '100%',

    '&:hover': {
      backgroundColor: config.palette.tertiary,
    },
  },

  forgotPasswordLink: {
    color: `${config.palette.greyScales['400']} !important`,
    cursor: 'pointer',
    display: 'flex',
    fontSize: '14px',
    fontWeight: 400,
    justifyContent: 'center',
    marginTop: '25px',
    textDecoration: 'underline',

    '&:hover': {
      color: `${config.palette.greyScales['400']} !important`,
    },
  },

  inputField: {
    backgroundColor: config.palette.background.default,
    borderRadius: config.dimensions.borderRadius,
    color: config.palette.greyScales[400],
  },

  inputFieldContainer: {
    marginBottom: '25px',
    marginTop: '25px',
  },

  signInContainer: {
    height: '100%',
    width: '100%',
  },

  separatorContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '30px 0px 30px 0px',
  },

  separatorLine: {
    backgroundColor: config.palette.newGreyScales['100'],
    borderRadius: config.dimensions.borderRadius,
    height: '1px',
    width: '100%',
  },

  separatorText: {
    color: config.palette.newGreyScales['400'],
    padding: '0px 10px',
  },
}))

export default useStyles
