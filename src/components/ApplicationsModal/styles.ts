import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

export default makeStyles(({
  /* 1. Modal */

  modalContentsContainer: {
    backgroundColor: config.palette.background.default,
    borderRadius: '4px',
    boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.3)',
    height: '100%',
    /* The 'outline' property is necessary to remove
    an annoying orange border that Material UI adds
    to modals by default. Do NOT remove. */
    outline: 'none',
    /* The 'overflow' property is necessary to allow
    for scrolling on Material UI modals. Do NOT remove. */
    overflow: 'scroll',
    padding: '25px 80px',
    width: '100%',
  },

  /* 1.1 Modal's header */

  closeModalButtonContainer: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',

    '& > p': {
      color: config.palette.label,
      fontSize: '14px',
      fontWeight: 300,
      marginRight: '15px',
      textDecoration: 'underline',
    },

    '& > svg': {
      color: config.palette.active,
      height: '25px',
      width: '25px',
    },
  },

  editApplicationHeader: {
    color: config.palette.tertiary,
    fontSize: '22px',
    fontWeight: 400,
    margin: '20px 0px 0px 0px',
  },

  iconLogo: {
    color: config.palette.primary,
    height: 'auto',
    marginRight: '10px',
    width: '60px',
  },

  imageLogo: {
    height: 'auto',
    marginRight: '10px',
    padding: '5px',
    width: '60px',
  },

  logoAndNameContainer: {
    alignItems: 'center',
    display: 'flex',
  },

  modalHeaderContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 auto',
    maxWidth: '900px',
    width: '100%',
  },

  newApplicationHeader: {
    color: config.palette.tertiary,
    fontSize: '22px',
    fontWeight: 400,
    margin: '20px 0px 0px 0px',
  },

  portalName: {
    color: config.palette.tertiary,
    fontSize: '24px',
    fontWeight: 500,
  },

  /* 1.2 Modal's body */

  additionalInfoSubSectionTitle: {
    color: config.palette.tertiary,
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '20px',
    marginBottom: '37.5px',
  },

  alternativeSectionSeparator: {
    border: `1px solid ${config.palette.newGreyScales['100']}`,
    borderRadius: config.dimensions.borderRadius,
    margin: '25px 0px',
    width: '100%',
  },

  appAvatarContainer: {
    position: 'relative',
  },

  appAvatarSubSectionDescription: {
    color: config.palette.newGreyScales['400'],
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '17px',
    marginBottom: '25px',
  },

  appNameAndShortDescriptionSubSectionTitle: {
    color: config.palette.tertiary,
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '20px',
    marginBottom: '40px',
  },

  appURLFieldWrapper: {
    display: 'flex',

    '& > :first-child': {
      marginRight: '10px',
      maxWidth: '350px',
      width: '100%',
    },

    '& > :last-child': {
      backgroundColor: config.palette.background.default,
      border: `1px solid ${config.palette.greyScales['300']}`,
      borderRadius: '4px',
      color: config.palette.active,
      cursor: 'pointer',
      height: '40px',
      maxWidth: '40px',
      minWidth: '0px',
      padding: '6.5px',
      textAlign: 'center',
      width: '100%',
    },
  },

  avatarIcons: {
    color: config.palette.active,
    cursor: 'pointer',
    height: '20px',
    position: 'absolute',
    right: '7.5px',
    top: '7.5px',
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
        color: config.palette.active,
        height: '85px',
        transform: 'translateY(30px)',
      },
    },

    // Text field's helper text
    '& .MuiFormHelperText-root': {
      color: config.palette.label,

      '&.Mui-error': {
        color: config.palette.error,
      },
    },
  },

  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '25px',
  },

  clientApplicationCardStatusText: {
    color: config.palette.label,
    fontSize: '14px',
    fontWeight: 300,
    textAlign: 'left',
  },

  clientCredentialsSubSectionDescription: {
    color: config.palette.newGreyScales['400'],
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '17px',
    marginBottom: '40px',
  },

  clientSecretInputFieldContainer: {
    display: 'flex',
  },

  disabledAddOrEditButton: {
    backgroundColor: '#99e6cc',
    color: `${config.palette.primaryContrastText} !important`,
    fontSize: '16px',
    fontWeight: 500,
    padding: '6px 21px',
    pointerEvents: 'none',
    textDecoration: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: '#99e6cc',
    },
  },

  disabledClientIDInputField: {
    backgroundColor: '#DCDFE2',
    borderRadius: '4px',
    marginBottom: '25px',
    marginTop: '0px',
    maxWidth: '400px',
    pointerEvents: 'none',
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
      paddingRight: '8.5px !important',

      '& .MuiInputBase-input': {
        borderRight: '1px solid rgba(0, 0, 0, 0.2)',
        color: config.palette.label,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },

      '& .MuiInputAdornment-root': {
        color: config.palette.label,
        pointerEvents: 'none',
      },
    },
  },

  disabledClientSecretInputField: {
    backgroundColor: '#DCDFE2',
    borderRadius: '4px',
    marginBottom: '25px',
    marginTop: '0px',
    maxWidth: '350px',
    pointerEvents: 'none',
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
      paddingRight: '8.5px !important',

      '& .MuiInputBase-input': {
        borderRight: '1px solid rgba(0, 0, 0, 0.2)',
        color: config.palette.label,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },

      '& .MuiInputAdornment-root': {
        color: config.palette.label,
        pointerEvents: 'none',
      },
    },
  },

  disabledClientSecretInputFieldRefreshButton: {
    backgroundColor: '#DCDFE2',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    color: config.palette.label,
    height: '40px',
    marginLeft: '10px',
    padding: '7px 0px',
    pointerEvents: 'none',
    textAlign: 'center',
    width: '47px',
  },

  draftClientApplicationCardStatusIcon: {
    color: config.palette.label,
    fontSize: '12px',
    margin: '0px 12px 0px 12px',
  },

  editApplicationHeaderContainer: {
    display: 'flex',
  },

  editApplicationHeaderStatusContainer: {
    alignItems: 'center',
    display: 'flex',
    marginTop: '20px',
  },

  enabledAddOrEditButton: {
    backgroundColor: config.palette.primary,
    color: `${config.palette.primaryContrastText} !important`,
    fontSize: '16px',
    fontWeight: 500,
    padding: '6px 21px',
    textDecoration: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: config.palette.primary,
    },
  },

  enabledClientIDInputField: {
    marginBottom: '25px',
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

      // Multiline text field's styles
      '&.MuiInputBase-multiline': {
        height: '104.5px',
      },
    },

    // Text field's input text styles
    '& .MuiInputBase-root': {
      paddingRight: '8.5px !important',

      '& .MuiInputBase-input': {
        borderRight: '1px solid rgba(0, 0, 0, 0.2)',
        color: config.palette.active,
      },

      '& .MuiInputAdornment-root': {
        color: config.palette.active,
        cursor: 'pointer',
      },
    },
  },

  enabledClientSecretInputField: {
    marginBottom: '25px',
    marginTop: '0px',
    maxWidth: '350px',
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

      // Multiline text field's styles
      '&.MuiInputBase-multiline': {
        height: '104.5px',
      },
    },

    // Text field's input text styles
    '& .MuiInputBase-root': {
      paddingRight: '8.5px !important',

      '& .MuiInputBase-input': {
        borderRight: '1px solid rgba(0, 0, 0, 0.2)',
        color: config.palette.active,
      },

      '& .MuiInputAdornment-root': {
        color: config.palette.active,
        cursor: 'pointer',
      },
    },
  },

  enabledClientSecretInputFieldRefreshButton: {
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    color: config.palette.active,
    cursor: 'pointer',
    height: '40px',
    marginLeft: '10px',
    padding: '7px 0px',
    textAlign: 'center',
    width: '47px',
  },

  focusedAvatar: {
    background: '#C8DC8C linear-gradient(270deg, rgba(200, 220, 140, 1) 0%, rgba(25, 165, 140, 1) 100%)',
    fontSize: '13.75px',
    fontWeight: 300,
    height: '55px',
    left: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'absolute',
    right: 0,
    textTransform: 'uppercase',
    top: '12.5px',
    width: '55px',
    zIndex: 2,
  },

  infoBox: {
    alignItems: 'center',
    backgroundColor: config.palette.alert.success.background,
    borderRadius: '4px',
    display: 'flex',
    height: '100%',
    padding: '12px 10px',
    textAlign: 'left',
    width: '400px',
  },

  infoBoxIcon: {
    fill: '#46b5ef',
    transform: 'translate(-2.5px, -40px)',
  },

  infoBoxText: {
    color: '#035E86',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '18px',
    margin: '0px 0px 5px 2.5px',
  },

  inputFields: {
    marginBottom: '25px',
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

      // Multiline text field's styles
      '&.MuiInputBase-multiline': {
        height: '104.5px',
      },
    },

    // Text field's helper text styles
    '& > p': {
      color: config.palette.label,
    },

    // Text field's input text styles
    '& .MuiInputBase-root': {
      '& .MuiInputBase-input': {
        color: config.palette.active,
      },
    },
  },

  leftSubSectionContainer: {
    marginRight: '40px',
    width: '460px',
  },

  modalBodyContainer: {
    display: 'block',
    margin: '0 auto',
    maxWidth: '900px',
    width: '100%',
  },

  notFocusedAvatar: {
    background: '#C8DC8C linear-gradient(270deg, rgba(200, 220, 140, 1) 0%, rgba(25, 165, 140, 1) 100%)',
    fontSize: '20px',
    fontWeight: 300,
    height: '80px',
    left: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'absolute',
    right: 0,
    textTransform: 'uppercase',
    top: '12.5px',
    width: '80px',
    zIndex: 2,
  },

  optionalURLsSubSectionDescription: {
    color: config.palette.newGreyScales['400'],
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '17px',
    marginBottom: '22.5px',
  },

  otherButtons: {
    backgroundColor: config.palette.background.default,
    border: `1px solid ${config.palette.label}`,
    borderRadius: `${config.dimensions.borderRadius}px`,
    color: `${config.palette.active} !important`,
    fontSize: '16px',
    fontWeight: 500,
    marginLeft: '25px',
    padding: '6px 21px',
    textDecoration: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: config.palette.background.default,
    },
  },

  redirectURISubSectionTitle: {
    color: config.palette.tertiary,
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '20px',
    marginBottom: '37.5px',
  },

  regularSectionSeparator: {
    border: `1px solid ${config.palette.newGreyScales['100']}`,
    borderRadius: config.dimensions.borderRadius,
    margin: '0px 0px 25px 0px',
    width: '100%',
  },

  removeAppButton: {
    backgroundColor: config.palette.error,
    border: `1px solid ${config.palette.error}`,
    borderRadius: config.dimensions.borderRadius,
    color: `${config.palette.primaryContrastText} !important`,
    fontSize: '16px',
    fontWeight: 500,
    marginLeft: '25px',
    padding: '6px 21px',
    textDecoration: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: config.palette.error,
    },
  },

  rightSubSectionContainer: {
    width: '400px',
  },

  sectionContainer: {
    display: 'flex',
  },

  selectorOption: {
    color: config.palette.active,
    fontSize: '15px',
    fontWeight: 300,
    padding: '5px 25px',
  },

  selectorTitle: {
    color: config.palette.newGreyScales['400'],
    fontSize: '14px',
    fontWeight: 300,
    padding: '6px 25px',
  },

  subscribedClientApplicationCardStatusIcon: {
    color: config.palette.primary,
    fontSize: '14px',
    margin: '0px 12px 0px 12px',
  },
}))
