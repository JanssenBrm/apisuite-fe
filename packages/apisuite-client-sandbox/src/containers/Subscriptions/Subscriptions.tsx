import * as React from 'react'
import useStyles from './styles'
import SubscriptionsTable from 'components/SubscriptionsTable'
import { useTranslation } from 'react-i18next'

const Subscriptions: React.FC<{user: any; userApps: any; getUserApps: any}> = ({ user, userApps, getUserApps }) => {
  const classes = useStyles()
  const [t] = useTranslation()

  React.useEffect(() => {
    if (user) {
      getUserApps(user.id)
    }
  }, [])

  return (
    <div className={classes.root}>
      <section className={classes.contentContainer}>
        <h1 className={classes.title}>{t('subscriptions.title')}</h1>

        <p className={classes.description}>
          {t('subscriptions.description')}
        </p>

        <div className={classes.subscriptionsContainer}>
          <SubscriptionsTable apps={userApps} />
        </div>

      </section>
    </div>
  )
}

export default Subscriptions
