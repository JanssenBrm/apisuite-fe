import * as React from 'react'
import { useTranslation } from 'react-i18next'
import useStyles from './styles'
import store from 'store'
import { nextStepAction } from 'components/RegisterForm/ducks'

const RegisterConfirmation: React.FC<{}> = () => {
  const [t] = useTranslation()
  const classes = useStyles()

  /* Once this component renders (which means that we've reached the end of
  our registration process), we dispatch a 'NEXT_STEP' type of action so as to
  reset the 'steps' property of our app's store back to 1. */
  React.useEffect(() => {
    store.dispatch(nextStepAction())
  })

  return (
    <main className={classes.main}>
      <section className={classes.messageSide}>
        <section className={classes.messageContainer}>
          <h1 className={classes.messageTitle}>{t('registerConfirmation.messageTitle')}</h1>
          <p className={classes.message}>{t('registerConfirmation.message')}</p>
        </section>
      </section>

      <aside className={classes.imageSide} />
    </main>
  )
}

export default RegisterConfirmation
