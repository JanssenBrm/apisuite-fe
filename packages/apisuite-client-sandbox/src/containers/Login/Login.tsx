import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from './types'
import LoginForm from 'components/LoginForm'
import RegisterForm from 'components/RegisterForm'
import { decodeBase64 } from 'util/decodeBase64'
import { useParams } from 'react-router'
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
import { History } from 'history'

const Login: React.FC<{ history: History }> = ({ history }) => {
  const { view: viewParam, email: emailParam } = useParams()
  const [view, setView] = React.useState<View>(viewParam === 'register' ? 'register' : 'login')
  const [t] = useTranslation()

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
            ? <LoginForm history={history} />
            : <RegisterForm prefilledEmail={decodeBase64(emailParam)} />}
        </FormContainer>
      </FormSide>

      <ImageSide view={view} />
    </Main>
  )
}

export default Login
