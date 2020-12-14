import { makeStyles } from '@material-ui/styles'
import { theme } from '../theme'

export default makeStyles({
  overlay: {
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    width: '100%',
    flexDirection: 'column',
  },

  nav: {
    top: '0',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'fixed',
    width: 'inherit',
    flexDirection: 'row',

    '&.transparent': {
      backgroundColor: 'transparent !important',
    },

    '&.spaced': {
      justifyContent: 'space-between !important',
    },
  },

  logoContainer: {
    color: theme.palette.greyScales[900],
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    fontWeight: 600,
    padding: '10px 0px 10px 30px',
  },

  logo: {
    color: theme.palette.primary,
    height: 'auto',
    marginRight: '20px',
    width: '60px',

    '&.blank': {
      color: '#ffffff',
    },

    '& > .big-logo': {
      fontSize: '4em',
    },
  },

  clickable: {
    color: theme.palette.newGreyScales[400],
    display: 'flex',
    cursor: 'pointer',
    alignSelf: 'center',
    padding: '10px 30px',

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  close: {
    fontSize: '0.9em',
    marginRight: '10px',
    alignSelf: 'center',
  },

  container: {
    marginTop: '150px',
    marginBottom: '100px',
    padding: '30px',
  },
})
