import themeVariables from 'styles/variables.scss'
import { THEME } from 'constants/global'
import requireIfExists from 'util/requireIfExists'

const prepend = (array, value) => {
  const newArray = array.slice()
  newArray.unshift(value)
  return newArray
}

const fonts = ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif']
const logo = requireIfExists('logo.svg')

// API Products slider images
const apiSlider1 = requireIfExists('api_slide1.svg')
const apiSlider2 = requireIfExists('api_slide2.svg')
const apiSlider3 = requireIfExists('api_slide3.svg')

// Section APIs logos
const apiLogo1 = requireIfExists('logo.svg')
const apiLogo2 = requireIfExists('hellobank_logo.svg')
const apiLogo3 = requireIfExists('fintro_logo.svg')

// API detail image
const apiDetail = requireIfExists('api_detail.svg')
const accountDetails = requireIfExists('client_centric.svg')
const balanceData = requireIfExists('account_statement.svg')
const transactionInsights = requireIfExists('achieve_efficiency.svg')

// Documentation
const docOverview = requireIfExists('doc_overview.svg')

// Dashboard Overview
const myApps = requireIfExists('my_apps.svg')
const testData = requireIfExists('testdata.svg')
const userRoles = requireIfExists('user_roles.svg')
const activityLogs = requireIfExists('activity_logs.svg')
const documentation = requireIfExists('documentation.svg')
const support = requireIfExists('support.svg')

// Apps
const firstApp = requireIfExists('first_app.svg')
const gettingStarted = requireIfExists('getting_started.svg')
const walletApp = requireIfExists('wallet_app.svg')
const apiReferences = requireIfExists('api_references.svg')

// Recovery Codes
const recoveryLogo = requireIfExists('fortis_logo.svg')

// Social icons
const socialWeb = requireIfExists('web.svg')
const socialFacebook = requireIfExists('facebook.svg')
const socialLinkedIn = requireIfExists('linkedin.svg')
const socialTwitter = requireIfExists('twitter.svg')

const assets = {
  logo,
  apiSlider1,
  apiSlider2,
  apiSlider3,
  apiLogo1,
  apiLogo2,
  apiLogo3,
  apiDetail,
  accountDetails,
  balanceData,
  transactionInsights,
  docOverview,
  myApps,
  testData,
  userRoles,
  activityLogs,
  documentation,
  support,
  firstApp,
  gettingStarted,
  walletApp,
  apiReferences,
  recoveryLogo,
  socialFacebook,
  socialLinkedIn,
  socialTwitter,
  socialWeb,
}

const defaultPallete = {
  name: THEME,
  palette: {
    type: 'light',
    primary: {
      main: themeVariables.mainColor,
      dark: themeVariables.mainColorDark,
    },
    secondary: {
      main: themeVariables.primaryColor,
    },
  },
  typography: {
    useNextVariants: true,
    fontSize: 15,
    fontFamily: fonts.join(','),
    button: {
      textTransform: 'capitalize',
      fontWeight: 400,
    },
    display4: {
      fontSize: 32,
      letterSpacing: 0.42,
      color: themeVariables.primaryColor,
    },
    display3: {
      fontSize: 26,
      letterSpacing: 0.42,
      color: themeVariables.primaryColor,
    },
    display2: {
      fontSize: 22,
      letterSpacing: 0.36,
      color: themeVariables.primaryColor,
    },
    display1: {
      fontSize: 22,
      letterSpacing: 0.36,
      color: themeVariables.primaryColor,
    },
  },
}

export default {
  default: {
    ...defaultPallete,
    ...assets,
    bank: 'The Bank',
    features: [
      'subscriptions', 'testdata',
    ],
  },
  bnpp: {
    ...defaultPallete,
    ...assets,
    bank: 'BNPPF',
    features: [
      'subscriptions', 'testdata',
    ],
    staticNavigation: true,
    typography: {
      ...defaultPallete.typography,
      fontFamily: prepend(fonts, 'BNPPSans'),
      display4: {
        ...defaultPallete.typography.display4,
        fontFamily: 'BNPPSans-Light',
      },
      display3: {
        ...defaultPallete.typography.display3,
        fontFamily: 'BNPPSans-Light',
      },
      display1: {
        ...defaultPallete.typography.display1,
        fontFamily: 'BNPPSans-Light',
      },
    },
  },
}
