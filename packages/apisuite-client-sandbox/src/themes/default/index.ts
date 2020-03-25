import dog from './dog.jpg'
import { createMuiTheme } from '@material-ui/core/styles'
import { amber } from '@material-ui/core/colors'

export default createMuiTheme({
  palette: {
    primary: { main: '#2DB7BA' },
    secondary: { main: amber[500] },
  },
  spacing: (factor: number) => 8 * factor,
}, {
  asset: dog,
})
