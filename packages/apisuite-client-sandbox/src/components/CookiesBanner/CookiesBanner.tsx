import * as React from 'react'

import CookieConsent from 'react-cookie-consent'

import useStyles from './styles'

const CookiesBanner: React.FC = () => {
  /*
  Two notes about this 'cookies consent' banner:

  1) You may check up on (and delete) the generated cookie through the browser's
  Developer Tools (e.g., on Chrome, it's in the 'Application' tab, under 'Cookies');

  2) This 'cookies consent' banner will be hidden once accepted. To debug it (e.g., check up
  on style changes), you can simply add the 'debug' property to 'CookieConsent'.
  */
  const classes = useStyles()

  return (
    <CookieConsent
      buttonClasses={classes.cookiesConsentButton}
      buttonText='I Accept'
      containerClasses={classes.cookiesConsentBannerContainer}
      cookieName='cookiesConsent'
      location='bottom'
      overlay
    >
      <h2 className={classes.cookiesConsentHeader}>Your Privacy.</h2>

      <p className={classes.cookiesConsentParagraph}>
        We only use cookies to enable essential website operations, and to ensure certain features work properly,
        like the option to log in. We do not track. Any personal information you provide to us is removed when
        you delete your account.
      </p>

      <p className={classes.cookiesConsentParagraph}>
        <>Read about </>
        <a
          href='#'
          rel='noopener noreferrer'
          target='_blank'
        >
          our policies
        </a>
        <> for detailed questions and answers.</>
      </p>

      <p className={classes.cookiesConsentParagraph}>
        By clicking "I Accept", you agree to essential cookie usage.
      </p>
    </CookieConsent>
  )
}

export default CookiesBanner
