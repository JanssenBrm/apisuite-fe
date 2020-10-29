import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'
import { config } from 'constants/global'

const theme: ThemeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: config?.palette?.primary,
    },
    secondary: {
      main: config?.palette?.secondary,
    },
    grey: config?.palette?.greyScales,
    text: config?.palette?.text,
  },
}

export default theme
