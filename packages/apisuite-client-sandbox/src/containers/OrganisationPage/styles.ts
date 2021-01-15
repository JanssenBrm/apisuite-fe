import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

export default makeStyles(({
  root: {
    minHeight: '100%',
    backgroundColor: config.palette.background.default,
  },
  contentContainer: {
    maxWidth: 900,
    margin: '0 auto',
    transform: 'translateX(-8px)',
    paddingBottom: 100,
  },
  form: {
    display: 'flex',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    width: '65%',
  },
  aside: {
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100% - 65%)',
  },
  img: {
    width: 160,
    height: 160,
    borderRadius: '50%',
  },
  textField: {
    '& label.Mui-focused': {
      color: config.palette.primary,
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: config.palette.greyScales[600],
      },
      '&.Mui-focused fieldset': {
        borderColor: config.palette.primary,
      },
    },
  },
  disabled: {
    opacity: 0.5,
    pointerEvents: 'none',
  },
  btn: {
    display: 'inline-block',
    backgroundColor: '#333333',
    color: 'white',
    padding: '8px 24px',
    borderRadius: config.dimensions.borderRadius,
    cursor: 'pointer',
    fontWeight: 500,
    marginRight: 16,
    marginTop: 36,
    width: '60%',
  },
  btn2: {
    backgroundColor: 'white',
    color: '#646464',
    border: '1px solid #646464',
  },
  errorPlaceholder: {
    display: 'flex',
    marginTop: 10,
    width: '70%',
  },
  errorAlert: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: config.palette.feedback.error,
    border: 'solid',
    borderWidth: 1,
    borderColor: config.palette.feedback.error,
    fontSize: 13,
    color: '#FFF',
    padding: '2px 15px',
    borderRadius: config.dimensions.borderRadius,
    minHeight: 20,
  },

  // -----------

  orgDetailsContainer: {
    margin: '0px auto',
    maxWidth: '900px',
    width: '100%',
  },

  orgTitleAndSubtitleContainer: {
    width: '100%',
    marginBottom: '40px',
  },

  orgTitle: {
    color: '#14283C',
    fontSize: '32px',
    fontWeight: 300,
    marginBottom: '12px',
  },

  orgSubtitle: {
    color: '#85909A',
    fontSize: '16px',
    fontWeight: 300,
  },

  inputFields: {
    marginBottom: '25px',
    marginTop: '0px',
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

  orgMainDetailsContainer: {
    display: 'flex',
    width: '100%',
  },

  leftSideDetailsContainer: {
    marginRight: '60px',
    maxWidth: '440px',
    width: '100%',
  },

  rightSideDetailsContainer: {
    maxWidth: '400px',
    width: '100%',
  },

  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
  },

  notFocusedAvatar: {
    width: '80px',
    height: '80px',
    zIndex: 2,
    position: 'absolute',
    fontSize: '20px',
    fontWeight: 300,
    backgroundColor: '#B4DC8C',
    transform: 'translate(172.5px, 13px)',
  },

  focusedAvatar: {
    width: '55px',
    height: '55px',
    zIndex: 2,
    position: 'absolute',
    fontSize: '13.75px',
    fontWeight: 300,
    backgroundColor: '#B4DC8C',
    transform: 'translate(172.5px, 10px)',
  },

  avatarIcons: {
    color: config.palette.active,
    cursor: 'pointer',
    height: '20px',
    position: 'absolute',
    transform: 'translate(371.5px, 10px)',
    width: '20px',
    zIndex: 2,
  },

  avatarURLInputField: {
    marginTop: '0px',
    maxWidth: '400px',
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
        color: '#51606E',
        height: '85px',
        transform: 'translateY(30px)',
      },
    },

    // Text field's input helper text
    '& .MuiFormHelperText-root': {
      color: '#BAC0C6',

      '&.Mui-error': {
        color: '#f44336',
      },
    },
  },

  firstSectionSeparator: {
    border: `1px solid ${config.palette.newGreyScales['100']}`,
    borderRadius: config.dimensions.borderRadius,
    marginBottom: '25px',
    marginTop: '15px',
    maxWidth: '900px',
    width: '100%',
  },

  secondSectionSeparator: {
    border: `1px solid ${config.palette.newGreyScales['100']}`,
    borderRadius: config.dimensions.borderRadius,
    marginBottom: '15px',
    marginTop: '0px',
    maxWidth: '900px',
    width: '100%',
  },

  orgAdditionalDetailsContainer: {
    display: 'flex',
    width: '100%',
  },

  orgAdditionalDetailsTitle: {
    color: '#14283C',
    fontSize: '16px',
    fontWeight: 500,
    marginBottom: '30px',
  },

  orgAdditionalDetailsSubtitle: {
    color: '#85909A',
    fontSize: '14px',
    fontWeight: 300,
    lineHeight: '16.5px',
    marginBottom: '25px',
  },

  orgURLFieldWrapper: {
    display: 'flex',

    '& > :first-child': {
      marginRight: '10px',
      maxWidth: '350px',
      width: '100%',
    },

    '& > :last-child': {
      backgroundColor: '#FFFFFF',
      border: `1px solid ${config.palette.greyScales['300']}`,
      borderRadius: '4px',
      color: '#51606E',
      cursor: 'pointer',
      height: '40px',
      maxWidth: '40px',
      minWidth: '0px',
      padding: '6.5px',
      textAlign: 'center',
      width: '100%',
    },
  },

  enabledUpdateDetailsButton: {
    backgroundColor: config.palette.active,
    borderRadius: config.dimensions.borderRadius,
    color: config.palette.primaryContrastText,
    cursor: 'pointer',
    fontWeight: 500,
    height: '40px',
    maxWidth: '95px',
    padding: '6px 0px',
    textAlign: 'center',
    width: '100%',
  },

  disabledUpdateDetailsButton: {
    backgroundColor: config.palette.label,
    borderRadius: config.dimensions.borderRadius,
    color: config.palette.primaryContrastText,
    cursor: 'none',
    fontWeight: 500,
    height: '40px',
    maxWidth: '95px',
    padding: '6px 0px',
    pointerEvents: 'none',
    textAlign: 'center',
    width: '100%',
  },

  selectorOption: {
    fontSize: '15px',
    color: '#51606E',
    fontWeight: 300,
    padding: '5px 25px',
  },

  selectorTitle: {
    fontSize: '14px',
    fontWeight: 300,
    color: '#85909A',
    padding: '6px 25px',
  },

  enabledCreateOrgButton: {
    backgroundColor: config.palette.primary,
    borderRadius: config.dimensions.borderRadius,
    color: config.palette.primaryContrastText,
    cursor: 'pointer',
    fontWeight: 500,
    height: '40px',
    maxWidth: '185px',
    padding: '6px 0px',
    textAlign: 'center',
    width: '100%',
  },

  disabledCreateOrgButton: {
    backgroundColor: '#99e6cc',
    borderRadius: config.dimensions.borderRadius,
    color: config.palette.primaryContrastText,
    cursor: 'none',
    fontWeight: 500,
    height: '40px',
    maxWidth: '185px',
    padding: '6px 0px',
    pointerEvents: 'none',
    textAlign: 'center',
    width: '100%',
  },
}))
