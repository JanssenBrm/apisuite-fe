import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'
import { config } from 'constants/global'

const theme: ThemeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: config?.palette?.primary,
      contrastText: config?.palette?.primaryContrastText,
    },
    secondary: {
      main: config?.palette?.secondary,
      contrastText: config?.palette?.secondaryContrastText,
    },
    tertiary: {
      main: config?.palette?.tertiary,
    },
    focus: {
      main: config?.palette?.focus,
    },
    info: {
      main: config?.palette?.info,
    },
    grey: config?.palette?.newGreyScales,
    text: config?.palette?.text,
  },
}

export default theme
