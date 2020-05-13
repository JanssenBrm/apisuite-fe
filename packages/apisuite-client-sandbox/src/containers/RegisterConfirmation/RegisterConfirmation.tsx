import * as React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Main,
  MessageSide,
  ImageSide,
  MessageContainer,
  Message,
  MessageTitle,
} from './subComponents'

const RegisterConfirmation: React.FC<{}> = () => {
  const [t] = useTranslation()

  return (
    <Main>
      <MessageSide>
        <MessageContainer>
          <MessageTitle>{t('registerConfirmation.messageTitle')}</MessageTitle>
          <Message>{t('registerConfirmation.message')}</Message>
        </MessageContainer>
      </MessageSide>

      <ImageSide />
    </Main>
  )
}

export default RegisterConfirmation
