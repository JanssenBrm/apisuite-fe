import * as React from 'react'
import LoginPortal from 'components/LoginPortal'
import RegisterPortal from 'components/RegisterPortal'
import classnames from 'classnames'
import requireImage from 'util/requireImage'

const Login: React.FC<{match: any; register: any}> = ({ match, register }) => {
  const [authView, setAuthView] = React.useState('login')
  const [justRegistered, setJustRegistered] = React.useState(false)
  const [isRedirected, setRedirected] = React.useState(false)

  function handleViewChange (view: string) {
    setAuthView(view)
    setJustRegistered(false)
  }

  React.useEffect(() => {
    if (register.isRegistered) {
      handleViewChange('login')
      setJustRegistered(true)

      setTimeout(() => {
        setJustRegistered(false)
      }, 2000)
    }

    if (match.params.email && !isRedirected) {

      handleViewChange('register')
      setRedirected(true)
    }
  }, [register.isRegistered])

  const defaultEmail = () => {
    try {
      return atob(match.params.email)
    } catch {
      return ''
    }
  }

  return (
    <div className='auth-page'>
      <div className='auth-left-wrapper' />
      <div className='content-wrapper'>
        <div className='auth-content-left'>
          <div className='auth-content-stripe' />
          <div className='auth-forms-wrapper'>
            <h1>Welcome</h1>
            <div className='subtitle'>Please feel free to login or register, it's completely free!</div>
            <div className='auth-block'>
              <div className='auth-selector'>
                <div className={classnames({ selected: authView === 'login' })} onClick={() => handleViewChange('login')}>Login</div>
                <div className={classnames({ selected: authView === 'register' })} onClick={() => handleViewChange('register')}>Register</div>
              </div>
              <div className='auth-form'>
                {authView === 'login' &&
                  <LoginPortal />}
                {authView === 'register' &&
                  <RegisterPortal defaultEmail={defaultEmail()} />}
                {justRegistered && <div className='user-created-feedback'>Your account is created, {register.user}!</div>}
              </div>
            </div>
          </div>
        </div>
        <div className='auth-content-right'>
          {authView === 'login' &&
            <img src={requireImage('woman_login.svg')} />}
          {authView === 'register' &&
            <img src={requireImage('woman_register.svg')} />}
        </div>
      </div>
      <div className='auth-right-wrapper' />
    </div>
  )
}

export default Login
