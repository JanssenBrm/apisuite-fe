import * as React from 'react'

import APICatalog from 'components/APICatalog'
import Carousel from 'components/Carousel'
import Notice from 'components/Notice'

import Button from '@material-ui/core/Button'

import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded'
import ChromeReaderModeRoundedIcon from '@material-ui/icons/ChromeReaderModeRounded'
import ControlCameraRoundedIcon from '@material-ui/icons/ControlCameraRounded'
import FlightLandRoundedIcon from '@material-ui/icons/FlightLandRounded'

import useStyles from './styles'

import { SandboxProps } from './types'

import carouselBackground from 'assets/space-background.svg'
import carouselSlide1 from 'assets/carousel-slide-1.svg'
import carouselSlide2 from 'assets/carousel-slide-2.svg'

import { DEFAULT_SUPPORT_URL } from 'constants/global'

const Sandbox: React.FC<SandboxProps> = ({
  auth,
  getApis,
  settings,
  subscriptions,
}) => {
  const classes = useStyles()

  // TODO: Add translation capabilities
  // const [t] = useTranslation()

  const [recentlyAddedAPIs, setRecentlyAddedAPIs] = React.useState([])

  React.useEffect(() => {
    /* Triggers the retrieval and storage (on the app's Store, under 'subscriptions')
    of all API-related information we presently have. */
    getApis()
  }, [])

  React.useEffect(() => {
    /* Once 'subscriptions' info is made available, we process it so as to display it
    on our 'API Catalog' section. */
    const allAvailableAPIs = subscriptions.apis

    if (allAvailableAPIs.length) {
      let newRecentlyAddedAPIs

      newRecentlyAddedAPIs = allAvailableAPIs.map((api) => {
        if (api.apiVersions.length) {
          return {
            /* Determines if an 'API Catalog' entry will be clickable,
            and link to its corresponding 'API Details' view. */
            hasMoreDetails: true,
            id: api.apiVersions[0].apiId,
            apiName: api.apiVersions[0].title,
            apiDescription: api.docs ? api.docs.info : 'No description presently available.',
            apiVersion: api.apiVersions[0].version,
            // Used to link an 'API Catalog' entry to its corresponding 'API Details' view.
            apiRoutingId: api.apiVersions[0].id,
            apiAccess: api.type === 'local'
              ? 'Production access'
              : '',
          }
        }

        return {
          hasMoreDetails: false,
          id: api.id,
          apiName: api.name,
          apiDescription: api.docs ? api.docs.info : 'No description presently available.',
          apiVersion: 'No version available',
          apiAccess: api.type === 'local'
            ? 'Production access'
            : '',
        }
      })

      setRecentlyAddedAPIs(newRecentlyAddedAPIs)
    }
  }, [subscriptions])

  return (
    <main className='page-container'>
      {/* Carousel section */}
      <section className={classes.slideShowSectionContainer}>
        <Carousel
          carouselBackgroundImage={carouselBackground}
          iconsOfSliderButtonsArray={[
            <ControlCameraRoundedIcon key={1} />,
            <FlightLandRoundedIcon key={2} />,
            <ChromeReaderModeRoundedIcon key={3} />,
          ]}
          slidesAutoPlay
          slidesArray={[
            {
              slideButton: true,
              slideButtonLabel: 'Register',
              slideButtonLink: '/auth/register',
              slideContentsPlacement: 'top-to-bottom',
              slideForegroundImage: carouselSlide1,
              slideText: 'Sign up now to enjoy all portal features',
            },
            {
              slideButton: true,
              slideButtonLabel: 'API Products',
              slideButtonLink: '/dashboard/subscriptions',
              slideContentsPlacement: 'side-by-side',
              slideForegroundImage: carouselSlide2,
              slideText: 'Take a look at our available APIs',
            },
            {
              slideButton: true,
              slideButtonLabel: 'Coming soon!',
              slideButtonLink: '#',
              slideContentsPlacement: 'side-by-side',
              slideForegroundImage: carouselSlide2,
              slideText: '3rd slide not yet available',
            },
          ]}
          slidingAnimationDuration={1500}
          timeBetweenSlides={4000}
        />
      </section>

      {/* 'Steps' section */}
      <section className={classes.stepsSectionContainer}>
        <h1 className={classes.sectionIntroHeading}>
          Let's make things easy.
        </h1>

        <section className={classes.stepsSectionDescriptionsContainer}>
          <section className={classes.stepsDescriptionContainerOne}>
            <h3 className={classes.stepsDescriptionHeading}>
              {
                !auth.user
                  ? 'Create a developer account first.'
                  : 'We value you as an interested developer!'
              }
            </h3>

            <p className={classes.stepsDescriptionParagraphOne}>
              {
                !auth.user
                  ? 'Our API Portal enables you to register a free team-based account without on the fly.'
                  : `${settings.portalName} enables you to register your client apps and subscribe to our available API products.`
              }
            </p>

            <p className={classes.stepsDescriptionParagraphTwo}>
              <span>
                {
                  !auth.user
                    ? 'Once activated, we assist you in 3 straightforward steps to start consuming our API products.'
                    : 'Whenever you are ready, we assist you in 3 straightforward steps to start consuming our API products.'
                }
              </span>

              <>
                {
                  !auth.user
                    ? 'Not sure how to get there? The onboarding documentation will help you along.'
                    : 'Did you experience any issues with your account set-up?'
                }
              </>
            </p>

            <Button
              className={
                !auth.user
                  ? classes.stepsDescriptionRegisterButton
                  : classes.stepsDescriptionContactSupportButton
              }
              href={
                !auth.user
                  ? '/auth/register'
                  : settings.supportURL || DEFAULT_SUPPORT_URL
              }
              rel={
                auth.user
                  ? 'noopener noreferrer'
                  : ''
              }
              target={
                auth.user
                  ? '_blank'
                  : ''
              }
            >
              {
                !auth.user
                  ? 'Register now'
                  : 'Contact support'
              }
            </Button>
          </section>

          <section className={classes.stepsDescriptionContainerTwo}>
            <div className={classes.individualStepsContainer}>
              <div className={`${classes.individualStep} ${classes.individualStepsDivider}`}>
                <h1 style={{ color: '#7DD291' }}>1.</h1>

                <h3 style={{ color: '#7DD291' }}>Add your app</h3>

                <p>
                  <span>
                    You’ll need an app to send and receive API calls.
                  </span>

                  <>
                    Adding your app details will help us to enable this flow.
                  </>
                </p>

                <Button
                  className={classes.individualStepButton}
                  disabled={!auth.user}
                  href='/dashboard/apps'
                >
                  Add app
                </Button>
              </div>

              <div className={`${classes.individualStep} ${classes.individualStepsDivider}`}>
                <h1 style={{ color: '#32C896' }}>2.</h1>

                <h3 style={{ color: '#32C896' }}>Select an API</h3>

                <p>
                  In the "Subscriptions" section, we provide an overview of our available
                  Sandbox APIs your apps can subscribe to.
                </p>

                <Button
                  className={classes.individualStepButton}
                  disabled={!auth.user}
                  href='/dashboard/subscriptions'
                >
                  Subscribe to API
                </Button>
              </div>

              <div className={classes.individualStep}>
                <h1 style={{ color: '#007D7D' }}>3.</h1>

                <h3 style={{ color: '#007D7D' }}>Get Started</h3>

                <p>
                  Once your app and API subscriptions are all ready to go,
                  head to our "Getting Started" documentation for lift-off.
                </p>

                <Button
                  className={classes.individualStepButton}
                  disabled={!auth.user}
                  href='/dashboard/test'
                >
                  Documentation
                </Button>
              </div>
            </div>
          </section>
        </section>
      </section>

      <hr className={classes.sectionSeparator} />

      {/* 'API Catalog' section */}
      <section className={classes.apiCatalogSectionContainer}>
        <h1 className={classes.sectionIntroHeading}>
          API Catalog recent additions
        </h1>

        {
          /*
          TODO: Add logic for when:
          1) There's no API information to show;
          2) API information is still being retrieved;
          3) API information has been retrieved.
          */
        }
        <section className={classes.apiCatalogContainer}>
          {
            recentlyAddedAPIs.length === 0
              ? <p>No APIs have been recently added.</p>
              : <APICatalog recentlyAddedAPIs={recentlyAddedAPIs} />
          }
        </section>
      </section>

      {/* Notice */}
      <section className={classes.noticeContainer}>
        <Notice
          noticeIcon={
            <CheckCircleOutlineRoundedIcon />
          }
          noticeText={
            <p>
              <>{settings.portalName} is maintained by {settings.clientName}. You can visit us at </>
              <a
                href={settings.socialURLs.length > 0 ? settings.socialURLs[0].url : '#'}
                rel='noopener noreferrer'
                target='_blank'
              >
                {settings.socialURLs.length > 0 ? settings.socialURLs[0].url : '(loading URL)'}
              </a>
              <>.</>
            </p>
          }
        />
      </section>
    </main>
  )
}

export default Sandbox
