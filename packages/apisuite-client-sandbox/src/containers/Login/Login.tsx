import * as React from 'react'
import ReactDom from 'react-dom'
import { Redirect } from 'react-router'
import LoginPortal from 'components/LoginPortal'
import { useKeyPress } from 'util/useKeyPress'

const portalRoot = document.getElementById('root')

const Login: React.FC<{}> = () => {
  const closeRoute = '/'
  const escapeKeyPress = useKeyPress('Escape')

  if (portalRoot !== null) {
    return ReactDom.createPortal(
      escapeKeyPress ? <Redirect to={closeRoute} /> : <LoginPortal />,
      portalRoot)
  } else {
    return <Redirect to={closeRoute} />
  }
}

export default Login
