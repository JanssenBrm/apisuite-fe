import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

export default makeStyles(({
  actionsContainer: {
    display: 'flex',
    marginBottom: '65px',
    marginTop: '10px',
  },

  disabledUpdatePasswordButton: {
    backgroundColor: config.palette.label,
    border: `1px solid ${config.palette.label}`,
    borderRadius: config.dimensions.borderRadius,
    color: `${config.palette.primaryContrastText} !important`,
    cursor: 'none',
    fontSize: '16px',
    fontWeight: 500,
    height: '40px',
    marginRight: '15px',
    padding: '12px 20px',
    pointerEvents: 'none',
    textDecoration: 'none',
  },

  enabledUpdatePasswordButton: {
    backgroundColor: config.palette.tertiary,
    border: `1px solid ${config.palette.tertiary}`,
    borderRadius: config.dimensions.borderRadius,
    color: `${config.palette.primaryContrastText} !important`,
    fontSize: '16px',
    fontWeight: 500,
    height: '40px',
    marginRight: '15px',
    padding: '12px 20px',
    textDecoration: 'none',
  },

  forgotPasswordButton: {
    backgroundColor: config.palette.primaryContrastText,
    border: `1px solid ${config.palette.label}`,
    borderRadius: config.dimensions.borderRadius,
    color: `${config.palette.active} !important`,
    fontSize: '16px',
    fontWeight: 500,
    height: '40px',
    padding: '12px 20px',
    textDecoration: 'none',
  },

  inputFields: {
    marginBottom: '20px',
    marginTop: '20px',
    maxWidth: '500px',
    width: '100%',

    // Text field's label styles
    '& > label': {
      color: config.palette.label,
    },

    '& label.Mui-focused': {
      color: `${config.palette.primary} !important`,
    },

    // Text field's input outline styles
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: `${config.palette.greyScales['300']} !important`,
      },

      '&.Mui-focused fieldset': {
        borderColor: `${config.palette.primary} !important`,
      },
    },

    // Text field's input text styles
    '& .MuiInputBase-root': {
      '& .MuiInputBase-input': {
        color: config.palette.active,
      },
    },
  },

  sectionSeparator: {
    border: `1px solid ${config.palette.newGreyScales['100']}`,
    borderRadius: config.dimensions.borderRadius,
    marginBottom: '25px',
    maxWidth: '900px',
    width: '100%',
  },

  securityTitle: {
    color: config.palette.tertiary,
    fontSize: '32px',
    fontWeight: 300,
    marginBottom: '55px',
  },

  updatePasswordContainer: {
    margin: '0px auto',
    maxWidth: '900px',
    width: '100%',
  },

  updatePasswordTitle: {
    color: config.palette.tertiary,
    fontSize: '16px',
    fontWeight: 500,
    marginBottom: '10px',
  },

  userActivityTitle: {
    color: '#BAC0C6',
    fontSize: '22px',
    fontWeight: 300,
  },
}))
