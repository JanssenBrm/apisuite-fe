import { makeStyles } from '@material-ui/styles'

export default makeStyles(({
  activeTab: {
    '& > span': {
      fontWeight: 600,
    },
  },

  activeTabOverLineOfOpaqueMenu: {
    backgroundColor: '#32C896',
    bottom: 'unset',
    height: '3px',
    top: 0,
    transition: 'none !important',
  },

  activeTabOverLineOfTransparentMenu: {
    backgroundColor: '#FFFFFF',
    bottom: 'unset',
    height: '3px',
    top: 0,
    transition: 'none !important',
  },

  activeTabUnderLineOfOpaqueMenu: {
    backgroundColor: '#14283C',
    height: '3px',
    transition: 'none !important',
  },

  activeTabUnderLineOfTransparentMenu: {
    backgroundColor: '#19B3EE',
    height: '3px',
    transition: 'none !important',
  },

  alternativeLogo: {
    color: '#32C896',
    height: 'auto',
    marginRight: '20px',
    width: '60px',
  },

  bottomOfNavigationMenuContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
  },

  contractibleNavigationTab: {
    color: '#FFFFFF',
    fontSize: '18px',
    fontWeight: 300,
    minWidth: 'unset',
    opacity: 1,
    padding: '16px',
    textTransform: 'none',
  },

  contractibleNavigationSubTab: {
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: 300,
    minWidth: 'unset',
    opacity: 1,
    padding: '16px',
    textTransform: 'none',
  },

  leftOfContainer: {
    alignItems: 'center',
    display: 'flex',
    width: '300px',
  },

  logOutAvatar: {
    width: '33px',
    height: '33px',
    color: '#FFFFFF',
  },

  nonContractibleNavigationTab: {
    color: '#FFFFFF',
    fontSize: '18px',
    fontWeight: 300,
    minWidth: 'unset',
    opacity: 1,
    padding: '40px 16px',
    textTransform: 'none',
  },

  nonContractibleNavigationSubTab: {
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: 300,
    minWidth: 'unset',
    opacity: 1,
    padding: '40px 16px',
    textTransform: 'none',
  },

  nonScrolledSubTabsContainer: {
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    padding: '0 50px',
  },

  portalName: {
    fontSize: '24px',
    fontWeight: 400,
  },

  regularLogo: {
    color: '#FFFFFF',
    height: 'auto',
    marginRight: '20px',
    width: '60px',
  },

  rightOfContainer: {
    alignItems: 'center',
    display: 'flex',
    position: 'absolute',
    right: '0',

    '& > p': {
      color: '#FFFFFF',
      fontSize: '18px',
      fontWeight: '300',
      marginRight: '16px',
    },
  },

  scrolledSubTabsContainer: {
    alignItems: 'flex-end',
    backgroundColor: '#ecedef',
    color: '#51606e',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    padding: '0 50px',
  },

  separator: {
    border: '1px solid #FFFFFF',
    borderRadius: '10px',
    margin: '5px auto 0px auto',
    width: 'calc(100% - 100px)',
  },

  topOfNavigationMenuContainer: {
    alignItems: 'center',
    display: 'flex',
  },

  userPhotoAvatar: {
    width: '33px',
    height: '33px',
    border: '2px solid #32C896',
  },

  // -----

}))
