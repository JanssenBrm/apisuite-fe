import { createMuiTheme } from '@material-ui/core/styles'
import { blue, amber } from '@material-ui/core/colors'

export default createMuiTheme({
  palette: {
    primary: { main: blue[300] },
    secondary: { main: amber[500] },
  },
  spacing: (factor: number) => 8 * factor,
})
