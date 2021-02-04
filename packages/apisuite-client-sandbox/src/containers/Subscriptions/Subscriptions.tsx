import * as React from 'react'

import { useTranslation } from 'react-i18next'

import Button from 'components/Button'
import Link from 'components/Link'
import SubscriptionsModal from 'components/SubscriptionsModal'
import SubscriptionsTable from 'components/SubscriptionsTable'

import SportsSoccerRoundedIcon from '@material-ui/icons/SportsSoccerRounded'

import { SubscriptionsProps } from './types'

import rocket from 'assets/rocket.svg'

import useStyles from './styles'

import { config } from 'constants/global'

const Subscriptions: React.FC<SubscriptionsProps> = ({
  auth,
  getAPIs,
  getUserApps,
  subscriptions,
}) => {
  const classes = useStyles()

  const [t] = useTranslation()

  /* Retrieval of our APIs' data */

  React.useEffect(() => {
    /* Triggers the retrieval and storage of all API and app-related information
    we presently have. Once this is done, the 'SubscriptionsTable' component will
    have all the information it needs. */
    if (auth?.user) {
      getAPIs()
      getUserApps(auth.user.id)
    }
  }, [])

  /* Modal stuff */

  const [isModalOpen, setModalOpen] = React.useState(false)

  const toggleModal = () => {
    setModalOpen(!isModalOpen)
  }

  return (
    <main className='page-container'>
      {
        subscriptions.apis.length === 0
          ? (
            <section className={classes.noDataToShowContentContainer}>
              <div className={classes.noDataToShowImageContainer}>
                <img className={classes.noDataToShowImage} src={rocket} />
              </div>

              <div className={classes.addSubscriptionButtonContainer}>
                <Button
                  customButtonClassName={classes.addSubscriptionButton}
                  href='#'
                  label={
                    t('dashboardTab.subscriptionsSubTab.hasNoDataToShow.buttonLabel', { config })
                  }
                  onClick={toggleModal}
                />
              </div>

              <Link
                className={classes.noDataToShowLink}
                to='https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/580517951/API+Subscriptions'
              >
                {t('dashboardTab.subscriptionsSubTab.hasNoDataToShow.linkText', { config })}
              </Link>
            </section>
          )
          : (
            <section className={classes.dataToShowContentContainer}>
              <h1 className={classes.dataToShowTitle}>
                {t('dashboardTab.subscriptionsSubTab.hasDataToShow.title', { config })}
              </h1>

              <p className={classes.dataToShowDescription}>
                {t('dashboardTab.subscriptionsSubTab.hasDataToShow.description', { config })}
              </p>

              <div className={classes.dataToShowSubscriptionsTable}>
                <SubscriptionsTable />
              </div>

              <div className={classes.addSubscriptionButtonContainer}>
                <Button
                  customButtonClassName={classes.addSubscriptionButton}
                  href='#'
                  label={
                    t('dashboardTab.subscriptionsSubTab.hasNoDataToShow.buttonLabel', { config })
                  }
                  onClick={toggleModal}
                />
              </div>

              <div className={classes.infoBox}>
                <SportsSoccerRoundedIcon className={classes.infoBoxIcon} />

                <p className={classes.infoBoxText}>
                  <>{t('dashboardTab.subscriptionsSubTab.hasDataToShow.notificationTextPartOne', { config })} "</>
                  <a
                    href='https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/580517951/API+Subscriptions'
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    {t('dashboardTab.subscriptionsSubTab.hasDataToShow.notificationTextPartTwo', { config })}
                  </a>
                  <>".</>
                </p>
              </div>
            </section>
          )
      }

      {
        isModalOpen &&
        <SubscriptionsModal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
        />
      }
    </main>
  )
}

export default Subscriptions
