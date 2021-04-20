import * as React from 'react'

import qs from 'qs'

import { useParams } from 'react-router'

import { useTranslation } from 'react-i18next'

import { decodeBase64 } from 'util/decodeBase64'

import InvitationForm from 'components/InvitationForm'
import SignInForm from 'components/SignInForm'
import SignUpForm from 'components/SignUpForm'

import AmpStoriesRoundedIcon from '@material-ui/icons/AmpStoriesRounded'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'

import { SignInOrUpProps, View } from './types'

import useStyles from './styles'

import { config } from 'constants/global'

const SignInOrUp: React.FC<SignInOrUpProps> = ({
  auth,
  invitation,
  history,
  settings,
}) => {
  const classes = useStyles()

  const [t] = useTranslation()

  const { view: viewParameter, email: emailParameter } = useParams<{ view: string; email: string }>()

  const [usingSSO, setSSO] = React.useState(false)
  const checkView = (): View => {
    if (viewParameter === 'signup') return 'signup'
    if (viewParameter === 'invitation') return 'invitation'
    return 'signin'
  }

  const [view, setView] = React.useState<View>(checkView())

  const changeView = (viewToDisplay: View) => {
    history.push(viewToDisplay)

    setView(viewToDisplay)
  }

  React.useEffect(() => {
    const invitationToken = qs.parse(window.location.search.slice(1)).token || undefined
    if (view === 'invitation' && settings.sso?.length && invitationToken) {
      setSSO(true)
    }
    if (usingSSO) {
      setSSO(false)
    }
  }, [settings])

  const renderRegisterInvitationOption = () => {
    if (auth.authToken) {
      return <option className={view === 'invitation' ? classes.selectedOption : classes.notSelectedOption} onClick={() => changeView('invitation')}>{t('login.invitationBtn')}</option>
    }
    return <option className={view === 'invitation' ? classes.selectedOption : classes.notSelectedOption} onClick={() => changeView('invitation')}>{t('login.invitationSignInBtn')}</option>
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
            {t(view === 'invitation' ? 'signInOrUpView.welcomeSubtitleInvitation' : 'signInOrUpView.welcomeSubtitle', { org: invitation?.invitation?.organization || 'Unknown' })}
          </p>

          <div>
            <div className={classes.selector}>
              {view === 'invitation' ? renderRegisterInvitationOption() : null}
              {
                view !== 'invitation' &&
                <>
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
                </>
              }
            </div>

            <div className={classes.form}>
              {view === 'signin' && <SignInForm history={history} />}
              {/* @ts-ignore */}
              {view === 'signup' && <SignUpForm prefilledEmail={decodeBase64(emailParameter)} />}
              {view === 'invitation' && <InvitationForm isLogged={!!auth.authToken} settings={settings} />}
            </div>
            {/* <div className={classes.formFooter}>
              {(view === 'invitation' && !auth.authToken) && <div>Sign Up</div>}
            </div> */}
          </div>
        </div>

        <div className={classes.imageSideContentContainer} />
      </section>
    </main>
  )
}

export default SignInOrUp
