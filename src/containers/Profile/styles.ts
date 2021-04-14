import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

export default makeStyles(({
  allUserDetailsContainer: {
    display: 'flex',
    margin: '0px auto 50px auto',
    maxWidth: '900px',
    width: '100%',
  },

  alternativeOrganisationDetailsTitle: {
    color: config.palette.tertiary,
    fontSize: '16px',
    fontWeight: 500,
    marginBottom: '40px',
  },

  alternativeSectionSeparator: {
    border: `1px solid ${config.palette.newGreyScales['100']}`,
    borderRadius: `${config.dimensions.borderRadius}px`,
    margin: '32.5px 0px',
    maxWidth: '900px',
    width: '100%',
  },

  avatar: {
    background: '#C8DC8C linear-gradient(270deg, rgba(200, 220, 140, 1) 0%, rgba(25, 165, 140, 1) 100%)',
    cursor: 'pointer',
    fontSize: '20px',
    fontWeight: 300,
    height: '120px',
    margin: '24px 100px',
    width: '120px',
  },

  avatarIcons: {
    color: config.palette.active,
    cursor: 'pointer',
    height: '20px',
    position: 'absolute',
    transform: 'translate(130px, -10px)',
    width: '20px',
  },

  createOrganisationButton: {
    backgroundColor: config.palette.primary,
    borderRadius: `${config.dimensions.borderRadius}px`,
    color: `${config.palette.primaryContrastText} !important`,
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 500,
    padding: '12px 20px',
    textDecoration: 'none',
    textTransform: 'none',
  },

  deleteAccountButton: {
    backgroundColor: config.palette.error,
    border: `1px solid ${config.palette.error}`,
    borderRadius: `${config.dimensions.borderRadius}px`,
    color: `${config.palette.primaryContrastText} !important`,
    fontSize: '16px',
    fontWeight: 500,
    padding: '12px 20px',
    textDecoration: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: config.palette.error,
    },
  },

  disabledInputFields: {
    borderRadius: `${config.dimensions.borderRadius}px`,
    marginBottom: '25px',
    marginTop: '0px',
    maxWidth: '270px',
    pointerEvents: 'none',
    width: '100%',

    // Text field's label styles
    '& > label': {
      color: config.palette.label,
    },

    '& label.Mui-focused': {
      color: `${config.palette.focus} !important`,
    },

    // Text field's input outline styles
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: `${config.palette.greyScales['300']} !important`,
      },

      '&.Mui-focused fieldset': {
        borderColor: `${config.palette.focus} !important`,
      },
    },

    // Text field's input text styles
    '& .MuiInputBase-root': {
      '& .MuiInputBase-input': {
        backgroundColor: '#DCDFE2',
        borderRadius: `${config.dimensions.borderRadius}px`,
        color: config.palette.label,
      },

      '& .MuiInputAdornment-root': {
        color: config.palette.label,
        pointerEvents: 'none',
      },
    },
  },

  disabledOrganisationButton: {
    backgroundColor: config.palette.label,
    borderRadius: `${config.dimensions.borderRadius}px`,
    color: `${config.palette.primaryContrastText} !important`,
    cursor: 'none',
    fontSize: '16px',
    fontWeight: 500,
    padding: '12px 20px',
    pointerEvents: 'none',
    textDecoration: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: config.palette.label,
    },
  },

  disabledUpdateDetailsButton: {
    backgroundColor: config.palette.label,
    borderRadius: `${config.dimensions.borderRadius}px`,
    color: `${config.palette.primaryContrastText} !important`,
    cursor: 'none',
    fontWeight: 500,
    height: '40px',
    margin: '10px auto',
    maxWidth: '270px',
    padding: '6px 0px',
    pointerEvents: 'none',
    textTransform: 'none',
    width: '100%',

    '&:hover': {
      backgroundColor: config.palette.label,
    },
  },

  enabledOrganisationButton: {
    backgroundColor: config.palette.active,
    borderRadius: `${config.dimensions.borderRadius}px`,
    color: `${config.palette.primaryContrastText} !important`,
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 500,
    padding: '12px 20px',
    textDecoration: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: config.palette.active,
    },
  },

  enabledUpdateDetailsButton: {
    backgroundColor: config.palette.active,
    borderRadius: `${config.dimensions.borderRadius}px`,
    color: `${config.palette.primaryContrastText} !important`,
    cursor: 'pointer',
    fontWeight: 500,
    height: '40px',
    margin: '10px auto',
    maxWidth: '270px',
    padding: '6px 0px',
    width: '100%',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: config.palette.active,
    },
  },

  formFieldsContainer: {
    backgroundColor: config.palette.primaryContrastText,
    border: `1px solid ${config.palette.label}`,
    borderRadius: `${config.dimensions.borderRadius}px`,
    marginBottom: '35px',
    textAlign: 'center',
  },

  formSectionSeparator: {
    border: `1px solid ${config.palette.newGreyScales['100']}`,
    borderRadius: `${config.dimensions.borderRadius}px`,
    margin: '0px 0px 20px 0px',
    maxWidth: '320px',
    width: '100%',
  },

  infoBox: {
    alignItems: 'center',
    backgroundColor: config.palette.alert.success.background,
    borderRadius: `${config.dimensions.borderRadius}px`,
    display: 'flex',
    height: '100%',
    padding: '12px 12px',
    textAlign: 'left',
    width: '400px',
  },

  infoBoxIcon: {
    fill: '#46B5EF',
    transform: 'translate(-3.5px, -23.5px)',
  },

  infoBoxText: {
    color: '#035E86',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '18px',
    margin: '0px 0px 5px 2.5px',
  },

  inputFields: {
    marginBottom: '15px',
    maxWidth: '270px',
    width: '100%',

    // Text field's label styles
    '& > label': {
      color: config.palette.label,
    },

    '& label.Mui-focused': {
      color: `${config.palette.focus} !important`,
    },

    // Text field's input outline styles
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: `${config.palette.greyScales['300']} !important`,
      },

      '&.Mui-focused fieldset': {
        borderColor: `${config.palette.focus} !important`,
      },
    },

    // Text field's input text styles
    '& .MuiInputBase-root': {
      '& .MuiInputBase-input': {
        color: config.palette.active,
      },
    },
  },

  leftSideDetailsContainer: {
    marginRight: '80px',
    maxWidth: '500px',
    width: '100%',
  },

  openIDInfoBoxContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '0px auto',
    maxWidth: '900px',
    width: '100%',
  },

  organisationDetailsTitle: {
    color: config.palette.tertiary,
    fontSize: '16px',
    fontWeight: 500,
    marginBottom: '40px',
  },

  organisationSelector: {
    borderColor: config.palette.label,
    marginBottom: '35px',

    // Selector
    '& > .MuiFormControl-root': {
      // Selector's label
      '& > .MuiFormLabel-root': {
        color: config.palette.label,
      },

      // Selector's input (i.e., text)
      '& > .MuiInputBase-root': {
        '& > .MuiInputBase-input': {
          color: config.palette.active,
        },
      },
    },
  },

  otherActionsButtons: {
    backgroundColor: config.palette.primaryContrastText,
    border: `1px solid ${config.palette.label}`,
    borderRadius: `${config.dimensions.borderRadius}px`,
    color: `${config.palette.active} !important`,
    fontSize: '16px',
    fontWeight: 500,
    marginRight: '15px',
    padding: '12px 20px',
    textDecoration: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: config.palette.primaryContrastText,
    },
  },

  otherActionsContainerOne: {
    display: 'flex',
  },

  otherActionsContainerTwo: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  regularSectionSeparator: {
    border: `1px solid ${config.palette.newGreyScales['100']}`,
    borderRadius: `${config.dimensions.borderRadius}px`,
    margin: '32.5px 0px 32.5px 0px',
    maxWidth: '900px',
    width: '100%',
  },

  rightSideDetailsContainer: {
    maxWidth: '320px',
    width: '100%',
  },

  signOutButton: {
    backgroundColor: config.palette.primaryContrastText,
    border: `1px solid ${config.palette.label}`,
    borderRadius: `${config.dimensions.borderRadius}px`,
    color: `${config.palette.active} !important`,
    fontSize: '16px',
    fontWeight: 500,
    marginLeft: '15px',
    padding: '12px 20px',
    textDecoration: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: config.palette.primaryContrastText,
    },
  },

  subtitle: {
    color: config.palette.newGreyScales['400'],
    fontSize: '16px',
    fontWeight: 300,
    marginBottom: '25px',
  },

  userDetailsContainer: {
    backgroundColor: config.palette.primaryContrastText,
    border: `1px solid ${config.palette.label}`,
    borderRadius: `${config.dimensions.borderRadius}px`,
  },

  userName: {
    color: config.palette.tertiary,
    fontSize: '32px',
    fontWeight: 300,
    marginRight: '10px',
    maxWidth: '355px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  userNameAndRoleContainer: {
    display: 'flex',
    height: '32.5px',
    marginBottom: '12px',
  },

  userRole: {
    backgroundColor: config.palette.primary,
    borderRadius: `${config.dimensions.borderRadius}px`,
    color: config.palette.primaryContrastText,
    fontSize: '14px',
    fontWeight: 300,
    padding: '2px 7.5px',
  },

  userStatusAndType: {
    display: 'flex',
    margin: '0px 25px 20px 25px',

    '& > :first-child': {
      color: config.palette.primary,
      fontSize: '14px',
      marginRight: '12px',
    },

    '& > :last-child': {
      color: config.palette.label,
      fontSize: '14px',
      fontWeight: 300,
      textAlign: 'left',
    },
  },
}))
