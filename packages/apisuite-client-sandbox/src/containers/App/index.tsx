import { connect, MapDispatchToPropsFunction } from 'react-redux'
import App from './App'
import selector from './selector'
import { AppDispatchToProps } from './types'
import { authActions } from 'containers/Auth/ducks'

const mapDispatchToProps: MapDispatchToPropsFunction<AppDispatchToProps, any> = (dispatch) => ({
  login: (...args) => dispatch(authActions.login(...args)),
})

export default connect(selector, mapDispatchToProps)(App)
