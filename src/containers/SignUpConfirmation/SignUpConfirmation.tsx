import * as React from 'react'

import { useTranslation } from 'react-i18next'

import AmpStoriesRoundedIcon from '@material-ui/icons/AmpStoriesRounded'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import InfoRoundedIcon from '@material-ui/icons/InfoRounded'

import { SignUpConfirmationProps } from './types'

import useStyles from './styles'

import { config } from 'constants/global'

const SignUpConfirmation: React.FC<SignUpConfirmationProps> = ({
  getSettings,
  history,
  nextStep,
  register,
  settings,
}) => {
  const classes = useStyles()

  const [t] = useTranslation()

  /* Once this component renders (which means that we've reached the end of our registration process),
  we dispatch a 'NEXT_STEP' type of action so as to reset the 'steps' property of our app's store back to 1. */
  React.useEffect(() => {
    nextStep({})
  }, [nextStep])

  // Portal details

  const [portalDetails, setPortalDetails] = React.useState({
    portalLogo: '',
    portalName: '',
  })

  React.useEffect(() => {
    if (!settings || (settings && !(settings.logoURL || settings.portalName))) {
      getSettings()
    } else if (settings) {
      const newPortalDetails = {
        portalLogo: settings.logoURL ? settings.logoURL : '',
        portalName: settings.portalName,
      }

      setPortalDetails(newPortalDetails)
    }
  }, [settings])

  return (
    <main className={classes.mainContainer}>
      <header className={classes.headerContainer}>
        <div
          className={classes.logoAndNameContainer}
          onClick={() => history.push('/')}
        >
          {
            portalDetails.portalLogo
              ? (
                <img
                  className={classes.imageLogo}
                  src={portalDetails.portalLogo}
                />
              )
              : (
                <AmpStoriesRoundedIcon
                  className={classes.iconLogo}
                />
              )
          }

          <h3 className={classes.portalName}>
            {portalDetails.portalName}
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
        <div className={classes.signUpCompleteSideContentContainer}>
          <h1 className={classes.signUpCompleteSideTitle}>
            {t('signUpConfirmation.titleText', { config })}
            {register.previousData.personal.name}!
          </h1>

          <p className={classes.signUpCompleteSideSubtitle}>
            <>{t('signUpConfirmation.subtitleTextPartOne', { config })}</>
            <span className={classes.signUpCompleteSideSubtitleBoldPart}>
              {t('signUpConfirmation.subtitleTextPartTwo', { config })}
            </span>
            <>{t('signUpConfirmation.subtitleTextPartThree', { config })}</>
          </p>

          <div className={classes.infoBox}>
            <InfoRoundedIcon className={classes.infoBoxIcon} />

            <div>
              <p className={classes.infoBoxText}>
                {t('signUpConfirmation.infoBoxText', { config })}
              </p>
            </div>
          </div>
        </div>

        <div className={classes.imageSideContentContainer} />
      </section>
    </main>
  )
}

export default SignUpConfirmation
