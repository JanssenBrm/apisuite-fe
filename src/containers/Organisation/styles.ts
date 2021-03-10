import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

export default makeStyles(({
  avatarContainer: {
    alignItems: 'center',
    display: 'flex',
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
        height: '85px',
        transform: 'translateY(30px)',
      },
    },

    // Text field's input helper text
    '& .MuiFormHelperText-root': {
      color: config.palette.label,

      '&.Mui-error': {
        color: config.palette.error,
      },
    },
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

  firstSectionSeparator: {
    border: `1px solid ${config.palette.newGreyScales['100']}`,
    borderRadius: config.dimensions.borderRadius,
    marginBottom: '25px',
    marginTop: '15px',
    maxWidth: '900px',
    width: '100%',
  },

  focusedAvatar: {
    backgroundColor: '#B4DC8C',
    fontSize: '13.75px',
    fontWeight: 300,
    height: '55px',
    position: 'absolute',
    transform: 'translate(172.5px, 10px)',
    width: '55px',
    zIndex: 2,
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
    marginRight: '60px',
    maxWidth: '440px',
    width: '100%',
  },

  notFocusedAvatar: {
    backgroundColor: '#B4DC8C',
    fontSize: '20px',
    fontWeight: 300,
    height: '80px',
    position: 'absolute',
    transform: 'translate(172.5px, 13px)',
    width: '80px',
    zIndex: 2,
  },

  orgAdditionalDetailsContainer: {
    display: 'flex',
    width: '100%',
  },

  orgAdditionalDetailsSubtitle: {
    color: config.palette.newGreyScales['400'],
    fontSize: '14px',
    fontWeight: 300,
    lineHeight: '16.5px',
    marginBottom: '25px',
  },

  orgAdditionalDetailsTitle: {
    color: config.palette.tertiary,
    fontSize: '16px',
    fontWeight: 500,
    marginBottom: '30px',
  },

  orgDetailsContainer: {
    margin: '0px auto',
    maxWidth: '900px',
    width: '100%',
  },

  orgMainDetailsContainer: {
    display: 'flex',
    width: '100%',
  },

  orgSubtitle: {
    color: config.palette.newGreyScales['400'],
    fontSize: '16px',
    fontWeight: 300,
  },

  orgTitle: {
    color: config.palette.tertiary,
    fontSize: '32px',
    fontWeight: 300,
    marginBottom: '12px',
  },

  orgTitleAndSubtitleContainer: {
    marginBottom: '40px',
    width: '100%',
  },

  orgURLFieldWrapper: {
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

  rightSideDetailsContainer: {
    maxWidth: '400px',
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
}))
