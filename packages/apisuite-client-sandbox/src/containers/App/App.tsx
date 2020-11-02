import * as React from 'react'
import { useLocation } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import InformDialog from 'components/InformDialog'
import NotificationStack from 'containers/NotificationStack'
import theme from 'theme'
import routes from './routes'
import { AppProps } from './types'
import useStyles from './styles'

const App: React.FC<AppProps> = ({
  auth,
  getProfile,
  getSettings,
  loginUser,
}) => {
  const classes = useStyles()
  const { pathname } = useLocation()

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  React.useEffect(function initOnce () {
    getSettings()
    if (auth.authToken && !auth.user) {
      loginUser({ token: auth.authToken })
    }
  }, [])

  React.useEffect(() => {
    if (auth.user) {
      getProfile()
    }
  }, [auth.user])

  return (
    <ThemeProvider theme={createMuiTheme(theme)}>
      <div className={classes.root}>
        {routes()}
        <InformDialog />
        <NotificationStack />
      </div>
    </ThemeProvider>
  )
}

export default App
