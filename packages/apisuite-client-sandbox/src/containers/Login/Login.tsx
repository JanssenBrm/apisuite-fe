import * as React from 'react'
import LoginPortal from 'components/LoginPortal'
import RegisterPortal from 'components/RegisterPortal'
import classnames from 'classnames'
import requireImage from 'util/requireImage'
import { useTranslation } from 'react-i18next'
import { View } from './types'
import {
  Main,
  FormSide,
  FormContainer,
  ImageSide,
  ImageContainer,
  Stripe,
  WelcomeTitle,
  WelcomeMsg,
  SignInSignUpSelector,
  Option,
  Img,
} from './subComponents'

const Login: React.FC<{match: any; register: any}> = ({ match, register }) => {
  const view = match.params.view
  const encodedEmail = match.params.email
  const [authView, setAuthView] = React.useState<View>(view === 'register' ? 'register' : 'login')
  const [justRegistered, setJustRegistered] = React.useState(false)
  const [isRedirected, setRedirected] = React.useState(false)
  const [t] = useTranslation()

  function handleViewChange (view: View) {
    switch (view) {
      case 'login':
        setAuthView(view)
        break
      case 'register':
        setAuthView(view)
        break
      default:
        setAuthView('login')
    }
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
      return atob(encodedEmail)
    } catch {
      return ''
    }
  }

  return (
    <Main>

      <FormSide>
        <FormContainer>
          <WelcomeTitle>{t('login.welcomeTitle')}</WelcomeTitle>
          <WelcomeMsg>{t('login.welcomeMsg')}</WelcomeMsg>

          <SignInSignUpSelector>
            <Option onClick={() => handleViewChange('login')}>{t('login.signIn')}</Option>
            <Option onClick={() => handleViewChange('register')}>{t('login.signUp')}</Option>
          </SignInSignUpSelector>

        </FormContainer>
      </FormSide>

      <Stripe>
        <ImageSide>
          <ImageContainer>
            {authView === 'login' &&
              <Img src={requireImage('woman_login.svg')} />}
            {authView === 'register' &&
              <Img src={requireImage('woman_register.svg')} />}
          </ImageContainer>
        </ImageSide>

      </Stripe>

    </Main>
    // <div className='auth-page'>
    //   <div className='auth-left-wrapper' />
    //   <div className='content-wrapper'>
    //     <div className='auth-content-left'>
    //       <div className='auth-content-stripe' />
    //       <div className='auth-forms-wrapper'>
    //         <h1>Welcome</h1>
    //         <div className='subtitle'>Please feel free to login or register, it's completely free!</div>
    //         <div className='auth-block'>
    //           <div className='auth-selector'>
    //             <div className={classnames({ selected: authView === 'login' })} onClick={() => handleViewChange('login')}>Login</div>
    //             <div className={classnames({ selected: authView === 'register' })} onClick={() => handleViewChange('register')}>Register</div>
    //           </div>
    //           <div className='auth-form'>
    //             {authView === 'login' &&
    //               <LoginPortal />}
    //             {authView === 'register' &&
    //               <RegisterPortal defaultEmail={defaultEmail()} />}
    //             {justRegistered && <div className='user-created-feedback'>Your account is created, {register.user}!</div>}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className='auth-content-right'>
    //       {authView === 'login' &&
    //         <img src={requireImage('woman_login.svg')} />}
    //       {authView === 'register' &&
    //         <img src={requireImage('woman_register.svg')} />}
    //     </div>
    //   </div>
    //   <div className='auth-right-wrapper' />
    // </div>
  )
}

export default Login
