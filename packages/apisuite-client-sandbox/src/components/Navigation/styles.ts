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

  opaqueMenuTab: {
    color: '#FFFFFF',
    fontSize: '18px',
    fontWeight: 300,
    minWidth: 'unset',
    opacity: 1,
    padding: '40px 16px',
    textTransform: 'none',
  },

  transparentMenuTab: {
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

  yetToLogIn: {
    display: 'none',
  },

  activeTab: {
    '& > span': {
      fontWeight: 600,
    },
  },

  transparentMenuActiveTabOverLine: {
    backgroundColor: '#FFFFFF',
    height: '3px',
    top: 0,
    transition: 'none !important',
  },

  opaqueMenuActiveTabOverLine: {
    backgroundColor: '#32C896',
    height: '3px',
    top: 0,
    transition: 'none !important',
  },

  transparentSubMenuActiveTabUnderLine: {
    backgroundColor: '#19B3EE',
    height: '3px',
    transition: 'none !important',
  },

  opaqueSubMenuActiveTabUnderLine: {
    backgroundColor: '#14283C',
    height: '3px',
    transition: 'none !important',
  },

  userName: {
    fontSize: '18px',
    fontWeight: 300,
    marginRight: '20px',
  },

  transparentMenuUserAvatarContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 0,
  },

  opaqueMenuUserAvatarContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative',
    right: 0,
  },

  transparentMenuUserAvatar: {
    border: '2px solid #FFFFFF',
    height: '33px',
    width: '33px',
  },

  opaqueMenuUserAvatar: {
    border: '2px solid #32C896',
    height: '33px',
    width: '33px',
  },
}))
