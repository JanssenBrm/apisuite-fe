import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

const useStyles = makeStyles(({
  backButton: {
    backgroundColor: config.palette.background.default,
    border: `1px solid ${config.palette.label}`,
    color: `${config.palette.active} !important`,
    fontSize: '16px',
    fontWeight: 500,
    padding: '7.5px 45px',
    textTransform: 'none',
    width: '100%',

    '&:hover': {
      backgroundColor: config.palette.background.default,
    },
  },

  backButtonContainer: {
    margin: '20px 0px',
  },

  disabledNextButton: {
    backgroundColor: `${config.palette.label} !important`,
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

  enabledNextButton: {
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

  errorAlert: {
    backgroundColor: config.palette.feedback.error,
    borderRadius: config.dimensions.borderRadius,
    color: config.palette.background.default,
    minHeight: '50px',
    padding: '12px 25px',
  },

  errorPlaceholder: {
    marginTop: '30px',
    minHeight: '50px',
  },

  formCard: {
    display: 'block',
  },

  formTitle: {
    color: config.palette.primaryContrastText,
    fontSize: '26px',
    fontWeight: 300,
  },
}))

export default useStyles
