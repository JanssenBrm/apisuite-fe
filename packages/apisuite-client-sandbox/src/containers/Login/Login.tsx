import * as React from 'react'
import ReactDom from 'react-dom'
import { Redirect } from 'react-router'
import LoginPortal from 'components/LoginPortal'
import RegisterPortal from 'components/RegisterPortal'
import classnames from 'classnames'
import womanLogin from 'assets/woman_login.svg'

const portalRoot = document.getElementById('root')

const Login: React.FC<{}> = ({ match, register }) => {

  const [authView, setAuthView] = React.useState('login')
  const [justRegistered, setJustRegistered] = React.useState(false)

  React.useEffect(() => {
    if (register.isRegistered) {
      handleViewChange('login')
      setJustRegistered(true)
    }

    if (match.params.email) {
      handleViewChange('register')

    }
  }, [register.isRegistered])

  function handleViewChange (view) {
    setAuthView(view)
    setJustRegistered(false)
  }

  return (
    <div className='auth-page'>
      <div className='auth-left-wrapper'></div>
      <div className='content-wrapper'>
        <div className='auth-content-left'>
          <div className='auth-content-stripe' />
          <div className='auth-forms-wrapper'>
            <h1>Welcome</h1>
            <div className='subtitle'>Please feel free to login or register, it's completely free!</div>
            <div className='auth-block'>
              <div className='auth-selector'>
                <div className={classnames({selected: authView === 'login'})} onClick={() => handleViewChange('login')}>Login</div>
                <div className={classnames({selected: authView === 'register'})} onClick={() => handleViewChange('register')}>Register</div>
              </div>
              <div className='auth-form'>
                {authView === 'login' &&
                  <LoginPortal />
                }
                {authView === 'register' &&
                  <RegisterPortal defaultEmail={match.params.email}/>
                }
                {justRegistered && <div className='user-created-feedback'>Your account is created, {register.user}!</div>}
              </div>
            </div>
          </div>
        </div>
        <div className='auth-content-right'>
          <img src={womanLogin} />
        </div>
      </div>
      <div className='auth-right-wrapper'></div>
    </div>
  )
}

export default Login
