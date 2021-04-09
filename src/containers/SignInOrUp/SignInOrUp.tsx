import * as React from 'react'

import { useParams } from 'react-router'

import { useTranslation } from 'react-i18next'

import { decodeBase64 } from 'util/decodeBase64'

import SignInForm from 'components/SignInForm'
import SignUpForm from 'components/SignUpForm'

import AmpStoriesRoundedIcon from '@material-ui/icons/AmpStoriesRounded'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'

import { SignInOrUpProps, View } from './types'

import useStyles from './styles'

import { config } from 'constants/global'

const SignInOrUp: React.FC<SignInOrUpProps> = ({
  history,
  settings,
}) => {
  const classes = useStyles()

  const [t] = useTranslation()

  const { view: viewParameter, email: emailParameter } = useParams<{ view: string; email: string }>()

  const [view, setView] = React.useState<View>(viewParameter === 'signup' ? 'signup' : 'signin')

  const changeView = (viewToDisplay: View) => {
    history.push(viewToDisplay)

    setView(viewToDisplay)
  }

  return (
    <main className={classes.mainContainer}>
      <header className={classes.headerContainer}>
        <div
          className={classes.logoAndNameContainer}
          onClick={() => history.push('/')}
        >
          {
            settings.logoURL
              ? (
                <img
                  className={classes.imageLogo}
                  src={settings.logoURL}
                />
              )
              : (
                <AmpStoriesRoundedIcon
                  className={classes.iconLogo}
                />
              )
          }

          <h3 className={classes.portalName}>
            {settings.portalName}
          </h3>
        </div>

        <div
          className={classes.closeButtonContainer}
          onClick={() => history.push('/')}
        >
          <p>
            {t('signInOrUpView.closeButtonLabel', { config })}
          </p>
          <CloseRoundedIcon />
        </div>
      </header>

      <section className={classes.pageContentContainer}>
        <div className={classes.formSideContentContainer}>
          <h1 className={classes.formSideTitle}>
            {t('signInOrUpView.welcomeTitle', { config })}
          </h1>
          <p className={classes.formSideSubtitle}>
            {t('signInOrUpView.welcomeSubtitle', { config })}
          </p>

          <div>
            <div className={classes.selector}>
              <option
                className={
                  view === 'signin'
                    ? classes.selectedOption
                    : classes.notSelectedOption
                }
                onClick={() => changeView('signin')}
              >
                {t('signInOrUpView.options.signIn', { config })}
              </option>

              <option
                className={
                  view === 'signup'
                    ? classes.selectedOption
                    : classes.notSelectedOption
                }
                onClick={() => changeView('signup')}
              >
                {t('signInOrUpView.options.signUp', { config })}
              </option>
            </div>

            <div className={classes.form}>
              {
                view === 'signin'
                  ? <SignInForm history={history} />
                  // @ts-ignore
                  : <SignUpForm preFilledEmail={decodeBase64(emailParameter)} />
              }
            </div>
          </div>
        </div>

        <div className={classes.imageSideContentContainer} />
      </section>
    </main>
  )
}

export default SignInOrUp
