import * as React from 'react'
import { useTranslation } from 'react-i18next'
// TODO: change imports when these subcomponents get move to their own folders
import {
  Main,
  MessageContainer,
  MessageTitle,
  MessageSide,
  Message,
  ImageSide,
  Form,
  Button,
  Input,
  Label,
  Field,
  ErrorMsg,
  Placeholder,
} from './subComponents'
import { useForm } from 'util/useForm'
import { isValidEmail } from 'util/validations'

const ForgotPasswordPage: React.FC<{
  handleSubmit: (emailInformation: { email: string }) => void,
}> = ({ handleSubmit }) => {
  const [sent, setSent] = React.useState(false)
  const [t] = useTranslation()
  const { formState, handleFocus, handleChange } = useForm({
    email: '',
  }, {
    email: {
      rules: [isValidEmail],
      message: t('registerForm.warnings.email'),
    },
  })

  return (
    <Main>
      <MessageSide>
        {!sent &&
          <MessageContainer>
            <MessageTitle>{t('forgotPassword.messageTitle')}</MessageTitle>
            <Message>{t('forgotPassword.message')}</Message>

            <Form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault()
              handleSubmit(formState.values)
              setSent(true)
            }}
            >
              <Field>
                <Placeholder>
                  <Label
                    focused={formState.focused.email}
                    error={formState.touched.email && formState.errors.email}
                  >
                    E-mail
                  </Label>
                </Placeholder>
                <Input
                  name='email'
                  placeholder='E-mail'
                  type='email'
                  value={formState.values.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  focused={formState.focused.email}
                  error={formState.touched.email && formState.errors.email}
                />
                <Placeholder>
                  <ErrorMsg>{formState.touched.email && formState.errors.email && formState.errorMsgs.email}</ErrorMsg>
                </Placeholder>
              </Field>

              <Button type='submit' disabled={!formState.isValid}>SEND</Button>
            </Form>
          </MessageContainer>}

        {sent &&
          <MessageContainer>
            <MessageTitle>{t('forgotPassword.sent.messageTitle')}</MessageTitle>
            <Message>{t('forgotPassword.sent.message')}</Message>
          </MessageContainer>}

      </MessageSide>

      <ImageSide />
    </Main>
  )
}

export default ForgotPasswordPage
