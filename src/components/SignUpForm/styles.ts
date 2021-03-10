import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

const useStyles = makeStyles(({
  centerContent: {
    alignItems: 'center',
    color: 'red',
    display: 'flex',
    fontWeight: 500,
    height: '200px',
    justifyContent: 'center',
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

  loading: {
    color: config.palette.primary,
  },

  privacyPolicyDisclaimerContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '25px',
  },

  privacyPolicyDisclaimerLink: {
    color: `${config.palette.active} !important`,
    fontSize: '12px',
    fontWeight: 400,
  },

  privacyPolicyDisclaimerText: {
    color: config.palette.newGreyScales['400'],
    fontSize: '12px',
    fontWeight: 300,
    marginRight: '3.5px',
  },

  signUpContainer: {
    height: '100%',
    width: '100%',
  },
}))

export default useStyles
