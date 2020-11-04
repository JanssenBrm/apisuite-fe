import { makeStyles } from '@material-ui/styles'

export default makeStyles(({
  indicatorBottom: {
    backgroundColor: 'black',
  },

  indicatorTop: {
    height: 3,
    backgroundColor: 'white',
    bottom: 'unset',
    top: 0,
  },

  logo: {
    color: '#FFFFFF',
    height: 'auto',
    marginRight: '20px',
    width: '60px',
  },

  logoAndPortalNameContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'left',
    maxWidth: '700px',
    width: '100%',
  },

  portalName: {
    fontSize: '24px',
    fontWeight: 400,
  },

  tabRoot: {
    color: 'white',
    fontSize: 'inherit',
    fontWeight: 300,
    textTransform: 'none',
    padding: 16,
    minWidth: 'unset',
    opacity: 1,
    '&$selected': {
      fontWeight: 600,
    },
  },
}))
