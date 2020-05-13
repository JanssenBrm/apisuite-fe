import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from './types'
import LoginForm from 'components/LoginForm'
import RegisterForm from 'components/RegisterForm'
import {
  Main,
  FormSide,
  FormContainer,
  ImageSide,
  WelcomeTitle,
  WelcomeMsg,
  LoginRegisterSelector,
  Option,
} from './subComponents'

const Login: React.FC<{match: any; register: any}> = ({ match, register }) => {
  const viewParam = match.params.view
  const encodedEmail = match.params.email
  const [view, setView] = React.useState<View>(viewParam === 'register' ? 'register' : 'login')
  const [t] = useTranslation()

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

          <LoginRegisterSelector>
            <Option selected={view === 'login'} onClick={() => setView('login')}>{t('login.loginBtn')}</Option>
            <Option selected={view === 'register'} onClick={() => setView('register')}>{t('login.registerBtn')}</Option>
          </LoginRegisterSelector>

          {view === 'login'
            ? <LoginForm />
            : <RegisterForm defaultEmail={defaultEmail()} />}
        </FormContainer>
      </FormSide>

      <ImageSide view={view} />
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
    //               <LoginForm />}
    //             {authView === 'register' &&
    //               <RegisterForm defaultEmail={defaultEmail()} />}
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
