import { makeStyles } from '@material-ui/styles'

export default makeStyles(({
  regularLogo: {
    color: '#FFFFFF',
    height: 'auto',
    marginRight: '20px',
    width: '60px',
  },

  alternativeLogo: {
    color: '#32C896',
    height: 'auto',
    marginRight: '20px',
    width: '60px',
  },

  portalName: {
    fontSize: '24px',
    fontWeight: 400,
  },

  headerContentsContainer: {
    display: 'flex',
    alignItems: 'center',
  },

  logoAndNameContainer: {
    display: 'flex',
    alignItems: 'center',
  },

  tab: {
    color: '#FFFFFF',
    fontSize: '18px',
    fontWeight: 300,
    minWidth: 'unset',
    opacity: 1,
    padding: '16px',
    textTransform: 'none',
  },

  subTab: {
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: 300,
    minWidth: 'unset',
    opacity: 1,
    padding: '16px',
    textTransform: 'none',
  },

  authRelated: {
    display: 'none',
  },

  activeTab: {
    '& > span': {
      fontWeight: 600,
    },
  },

  activeTabOverLine: {
    backgroundColor: '#FFFFFF',
    bottom: 'unset',
    height: '3px',
    top: 0,
    transition: 'none !important',
  },

  activeTabUnderLine: {
    backgroundColor: '#14283C',
    height: '3px',
    transition: 'none !important',
  },
}))
