import * as React from 'react'
import useStyles from './styles'
import SubscriptionsTable from 'components/SubscriptionsTable'
import AmpStoriesOutlinedIcon from '@material-ui/icons/AmpStoriesOutlined'
import { ViewType } from 'components/SubscriptionsTable/types'

import { useTranslation } from 'react-i18next'

const Subscriptions: React.FC<{}> = () => {
  const classes = useStyles()
  const [t] = useTranslation()
  const [view, setView] = React.useState<ViewType>('list')

  function changeView () {
    if (view === 'list') {
      setView('cards')
    } else {
      setView('list')
    }
  }

  return (
    <div className={classes.root}>
      <section className={classes.contentContainer}>
        <h1 className={classes.title}>{t('subscriptions.title')}</h1>

        <p className={classes.description}>
          {t('subscriptions.description')}
        </p>

        <div
          className={classes.viewRow}
          onClick={changeView}
        >
          <div className={classes.viewIconContainer}>
            <AmpStoriesOutlinedIcon />
          </div>
        </div>

        <div className={classes.subscriptionsContainer}>
          <SubscriptionsTable view={view} />
        </div>
      </section>
    </div>
  )
}

export default Subscriptions
