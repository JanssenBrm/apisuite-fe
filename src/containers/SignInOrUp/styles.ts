import { makeStyles } from '@material-ui/styles'

import rocketMan from 'assets/rocketMan.svg'

import { config } from 'constants/global'

const useStyles = makeStyles({
  closeButtonContainer: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',

    '& > p': {
      color: config.palette.primaryContrastText,
      fontSize: '14px',
      fontWeight: 300,
      marginRight: '15px',
      textDecoration: 'underline',
    },

    '& > svg': {
      color: config.palette.background.default,
      height: '25px',
      width: '25px',
    },
  },

  form: {
    maxWidth: '550px',
  },

  formSideContentContainer: {
    padding: '200px 80px',
    width: '55%',

    '@media (min-width: 1100px)': {
      width: '50%',
    },

    '@media (min-width: 1280px)': {
      width: '45%',
    },
  },

  formSideSubtitle: {
    color: config.palette.newGreyScales['400'],
    fontSize: '20px',
    fontWeight: 300,
    marginBottom: '35px',
  },

  formSideTitle: {
    color: config.palette.tertiary,
    fontSize: '42px',
    fontWeight: 700,
    marginBottom: '5px',
  },

  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: '1024px',
    padding: '15px 80px',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
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

  imageSideContentContainer: {
    backgroundImage: 'url(' + rocketMan + ')',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 8.5% 100%)',
    width: '45%',

    '@media (min-width: 1100px)': {
      width: '50%',
    },

    '@media (min-width: 1280px)': {
      width: '55%',
    },
  },

  logoAndNameContainer: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
  },

  mainContainer: {
    backgroundColor: `${config.palette.background.default} !important`,
  },

  notSelectedOption: {
    background: 'none',
    borderBottom: '1px solid ' + config.palette.greyScales[300],
    color: config.palette.greyScales[300],
    cursor: 'pointer',
    flex: '1 1 0',
    fontWeight: 'normal',
    height: '40px',
    textAlign: 'center',

    '&:hover': {
      borderBottom: '3px solid ' + config.palette.greyScales[500],
      color: config.palette.greyScales[500],
      fontWeight: 'bold',
    },
  },

  pageContentContainer: {
    display: 'flex',
    height: '120vh',
    minWidth: '1024px',
    width: '100%',
  },

  portalName: {
    color: config.palette.tertiary,
    fontSize: '24px',
    fontWeight: 500,
  },

  selectedOption: {
    background: 'none',
    borderBottom: '3px solid ' + config.palette.primary,
    color: config.palette.primary,
    cursor: 'pointer',
    flex: '1 1 0',
    fontWeight: 'bold',
    height: '40px',
    textAlign: 'center',
  },

  selector: {
    display: 'flex',

    '@media (min-width: 1500px)': {
      maxWidth: '550px',
    },
  },

  separator: {
    width: '5px',
  },
})

export default useStyles
