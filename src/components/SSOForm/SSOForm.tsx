import * as React from 'react'

import { useTranslation } from 'react-i18next'

import Button from '@material-ui/core/Button'

import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded'

import { SSOFormProps } from './types'

import useStyles from './styles'

import { config } from 'constants/global'

const SSOForm: React.FC<SSOFormProps> = ({
  auth,
  ssoLogin,
}) => {
  const classes = useStyles()

  const [t] = useTranslation()

  const handleSubmit = (provider: string) => {
    localStorage.setItem('attemptingSignInWithProvider', provider)

    ssoLogin({ provider })
  }

  return (
    <div className={classes.ssoFormContainer}>
      {
        auth.providers?.map((provider, index) => (
          <div className={classes.ssoSignInWithButtonContainer}>
            <Button
              className={classes.ssoSignInWithButton}
              key={`${provider}${index}`}
              onClick={() => handleSubmit(provider)}
              startIcon={
                <VpnKeyRoundedIcon className={classes.ssoSignInWithIcon} />
              }
            >
              {t('signInForm.alternativeSignInButtonLabel', { config }) + ` ${provider}`}
            </Button>
          </div>
        ))
      }
    </div>
  )
}

export default SSOForm
