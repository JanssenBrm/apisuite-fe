import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

const useStyles = makeStyles({
  // a) Button's variant

  button: {
    backgroundColor: config.palette.primary,
    borderRadius: `${config.dimensions.borderRadius}px`,
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.15)',
    color: config.palette.primaryContrastText,
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: 600,
    padding: '6px 12px',
    position: 'relative',
    textAlign: 'center',
    textDecoration: 'none',

    '&:active': {
      boxShadow: '0 2px 5px 0 rgba(0,0,0,0.15)',
    },

    '&:hover': {
      cursor: 'pointer',
      boxShadow: '0 4px 6px 0 rgba(0,0,0,0.35)',
    },

    '&:link, &:visited': {
      color: config.palette.primaryContrastText,
    },
  },

  dark: {
    backgroundColor: config.palette.text.primary,
  },

  secondary: {
    backgroundColor: config.palette.secondary,
  },

  tertiary: {
    backgroundColor: config.palette.tertiary,
  },

  transparent: {
    background: 'none',
    borderWidth: 0,
    boxShadow: 'none',

    '&:hover': {
      boxShadow: 'none',
    },
  },

  // b) Button's text color

  primaryColor: {
    color: `${config.palette.primaryContrastText} !important`,
  },

  secondaryColor: {
    color: `${config.palette.secondaryContrastText} !important`,
  },

  tertiaryColor: {
    color: `${config.palette.tertiaryContrastText} !important`,
  },

  // c) Button's status

  disabled: {
    backgroundColor: `${config.palette.newGreyScales['300']} !important`,
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.05) !important',
    cursor: 'default !important',
    opacity: 0.6,
  },

  fullWidth: {
    width: '100%',
  },

  loading: {

  },
})

export default useStyles
