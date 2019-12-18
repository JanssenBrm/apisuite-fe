import * as React from 'react'
import ReactDom from 'react-dom'
import { Redirect } from 'react-router'
import RegisterPortal from 'components/RegisterPortal/RegisterPortal'

const portalRoot = document.getElementById('portal-root')

function useKeyPress (targetKey: string) {
  const [keyPressed, setKeyPressed] = React.useState(false)

  const keyDownHandler = (e: KeyboardEvent) => {
    if (e.key === targetKey) {
      setKeyPressed(true)
    }
  }

  const keyUpHandler = (e: KeyboardEvent) => {
    if (e.key === targetKey) {
      setKeyPressed(false)
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', keyDownHandler)
    document.addEventListener('keyup', keyUpHandler)

    return () => {
      document.removeEventListener('keydown', keyDownHandler)
      document.removeEventListener('keyup', keyUpHandler)
    }
  }, [])

  return keyPressed
}

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
