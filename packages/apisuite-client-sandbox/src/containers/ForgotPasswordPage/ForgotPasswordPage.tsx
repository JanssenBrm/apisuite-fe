import * as React from 'react'
import { Location, History } from 'history'
import { useTranslation } from 'react-i18next'
import FormCard from 'components/FormCard'
import FormField, { parseErrors, isValidEmail, isValidPass } from 'components/FormField'
import { FormFieldEvent } from 'components/FormField/types'
import useStyles from './styles'

const ForgotPasswordPage: React.FC<{
  forgotPassword: (emailInformation: { email: string }) => void,
  location: Location<{
    stage: 'recover' | 'forgot',
    token: string,
  }>,
  history: History<any>,
  auth: any,
  recoverPassword: (payload: { token: string; password: string }, history: History<any>) => void,
}> = ({
  forgotPassword,
  auth,
  location,
  history,
  recoverPassword,
}) => {
  const classes = useStyles()
  const [t] = useTranslation()
  let stage = 'forgot'
  if (location.state) stage = location.state.stage

  const [sent, setSent] = React.useState(false)
  const [submited, setSubmited] = React.useState(false)
  const [isFormValid, setFormValid] = React.useState(false)
  const [errors, setErrors] = React.useState()
  const [input, setInput] = React.useState('')

  React.useEffect(() => {
    // @ts-ignore
    setFormValid(errors && errors.length === 0)
  }, [errors])

  React.useEffect(() => {
    if (submited && !auth.isRecoveringPassword) {
      setSent(true)
    }
  }, [auth.isRecoveringPassword])

  const handleInputs = (e: FormFieldEvent, err: any) => {
    setInput(e.target.value)
    const eventTarget = e.target

    // @ts-ignore
    setErrors((old: string[]) => parseErrors(eventTarget, err, old || []))
  }

  function handleSubmit (e: React.FormEvent<HTMLFormElement> | KeyboardEvent) {
    e.preventDefault()
    setSubmited(true)
    if (stage === 'recover') {
      recoverPassword({ token: location.state.token, password: input }, history)
    } else {
      forgotPassword({ email: input })
    }
  }

  return (
    <main className={classes.main}>
      <section className={classes.messageSide}>
        {!sent &&
          <section className={classes.messageContainer}>
            <h1 className={classes.messageTitle}>
              {stage === 'recover' ? t('forgotPassword.messageTitleRecover') : t('forgotPassword.messageTitle')}
            </h1>
            <p className={classes.message}>
              {stage === 'recover' ? t('forgotPassword.messageRecover') : t('forgotPassword.message')}
            </p>

            <div className={classes.forgotPasswordContainer}>
              <FormCard
                buttonLabel={(location.state && location.state.stage === 'recover') ? t('actions.save') : t('actions.send')}
                buttonDisabled={!isFormValid}
                handleSubmit={handleSubmit}
                loading={auth.isRecoveringPassword}
              >
                <div className={classes.fieldContainer}>
                  {stage === 'recover'
                    ? (
                      <FormField
                        id='password-field'
                        label='Password'
                        variant='outlined'
                        type='password'
                        placeholder=''
                        name='password'
                        value={input}
                        onChange={handleInputs}
                        autoFocus
                        fullWidth
                        errorPlacing='bottom'
                        InputProps={{
                          classes: { input: classes.textField },
                        }}
                        rules={[
                          { rule: isValidPass(input), message: t('registerForm.warnings.password') },
                        ]}
                      />
                    )
                    : (
                      <FormField
                        id='email-field'
                        label='E-mail'
                        variant='outlined'
                        type='email'
                        placeholder=''
                        name='email'
                        value={input}
                        onChange={handleInputs}
                        autoFocus
                        fullWidth
                        errorPlacing='bottom'
                        InputProps={{
                          classes: { input: classes.textField },
                        }}
                        rules={[
                          { rule: isValidEmail(input), message: t('registerForm.warnings.email') },
                        ]}
                      />
                    )}
                </div>
              </FormCard>
            </div>
          </section>}

        {sent &&
          <section className={classes.messageContainer}>
            <h1 className={classes.messageTitle}>{t('forgotPassword.sent.messageTitle')}</h1>
            <p className={classes.message}>{t('forgotPassword.sent.message')}</p>
          </section>}
      </section>

      <aside className={classes.imageSide} />
    </main>
  )
}

export default ForgotPasswordPage
