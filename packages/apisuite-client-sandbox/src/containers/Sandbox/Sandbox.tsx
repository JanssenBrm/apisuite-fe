import * as React from 'react'

import { API_URL } from 'constants/endpoints'

import APICatalog from 'components/APICatalog'
import Carousel from 'components/Carousel'
import Notice from 'components/Notice'

import Button from '@material-ui/core/Button'

import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded'
import ChromeReaderModeRoundedIcon from '@material-ui/icons/ChromeReaderModeRounded'
import ControlCameraRoundedIcon from '@material-ui/icons/ControlCameraRounded'
import FlightLandRoundedIcon from '@material-ui/icons/FlightLandRounded'

import useStyles from './styles'

import carouselBackground from 'assets/space-background.svg'
import carouselSlide1 from 'assets/carousel-slide-1.svg'
import carouselSlide2 from 'assets/carousel-slide-2.svg'

const Sandbox: React.FC<{}> = () => {
  const classes = useStyles()

  // TODO: Add translation capabilities
  // const [t] = useTranslation()

  const recentlyAddedAPIs = [
    {
      id: 0,
      apiName: 'Swagger Petstore - OpenAPI 3.0',
      apiDescription: 'This is a sample Pet Store Server based on the OpenAPI 3.0 specification.',
      apiVersion: 'v1.0.5',
      apiAccess: 'Sandbox access',
    },
    {
      id: 1,
      apiName: 'Swagger Dragonstore - OpenAPI 3.0',
      apiDescription: 'This is a sample Dragon Store Server based on the OpenAPI 3.0 specification.',
      apiVersion: 'v1.0.5',
      apiAccess: 'Production access',
    },
    {
      id: 2,
      apiName: 'Swagger Lizzardstore - OpenAPI 3.0',
      apiDescription: 'This is a sample Lizzard Store Server based on the OpenAPI 3.0 specification.',
      apiVersion: 'v1.0.5',
      apiAccess: 'API Documentation',
    },
  ]

  return (
  /* TODO:
    1) Retrieve list of most recently added APIs
    (https://api.develop.apisuite.io/api-docs#tag/API/paths/~1:apiId~1versions~1:id/get)

    2) Pass that info to the 'API Catalog' section in array form (mock data, for now)
    */

    <main className='page-container'>
      {/* Carousel section */}
      <section className={classes.slideShowSectionContainer}>
        <Carousel
          carouselBackgroundImage={carouselBackground}
          iconsOfSliderButtonsArray={[
            <ControlCameraRoundedIcon />,
            <FlightLandRoundedIcon />,
            <ChromeReaderModeRoundedIcon />,
          ]}
          slidesAutoPlay
          slidesArray={[
            {
              slideButton: true,
              slideButtonLabel: 'Register',
              slideContentsPlacement: 'top-to-bottom',
              slideForegroundImage: carouselSlide1,
              slideText: 'Sign up now to enjoy all portal features',
            },
            {
              slideButton: true,
              slideButtonLabel: 'API Products',
              slideContentsPlacement: 'side-by-side',
              slideForegroundImage: carouselSlide2,
              slideText: 'Take a look at our available APIs',
            },
            {
              slideButton: true,
              slideButtonLabel: 'Coming soon!',
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
              Create a developer account first.
            </h3>

            <p className={classes.stepsDescriptionParagraphOne}>
              Our API Portal enables you to register a free team-based account without on the fly.
            </p>

            <p className={classes.stepsDescriptionParagraphTwo}>
              <span>
                Once activated, we assist you in 3 straightforward steps to start consuming our API products.
              </span>

              <>
                Not sure how to get there? The onboarding documentation will help you along.
              </>
            </p>

            <Button
              className={classes.stepsDescriptionRegisterButton}
            >
              Register now
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
                // TODO: Add 'href' attribute
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
                // TODO: Add 'href' attribute
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
                // TODO: Add 'href' attribute
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
              <>Cloudoki's Portal is maintained by Cloudoki. You can visit us at </>
              <a
                href='https://www.cloudoki.com'
                rel='noreferrer'
                target='_blank'
              >
                https://www.cloudoki.com
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
