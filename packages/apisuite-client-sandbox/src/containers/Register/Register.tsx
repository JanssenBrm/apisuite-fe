import * as React from 'react'
import ReactDom from 'react-dom'
import { Redirect } from 'react-router'
import RegisterPortal from 'components/RegisterPortal/RegisterPortal'
import { useKeyPress } from 'util/useKeyPress'

const portalRoot = document.getElementById('root')

const Register: React.FC<{}> = () => {
  const closeRoute = '/'
  const escapeKeyPress = useKeyPress('Escape')

  if (portalRoot !== null) {
    return ReactDom.createPortal(
      escapeKeyPress ? <Redirect to={closeRoute} /> : <RegisterPortal />, portalRoot)
  } else {
    return <Redirect to={closeRoute} />
  }
}

export default Register
