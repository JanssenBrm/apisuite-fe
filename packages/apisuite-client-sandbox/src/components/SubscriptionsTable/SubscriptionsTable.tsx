import * as React from 'react'
import useStyles from './styles'
import APIVersionCard from 'components/APIVersionCard'
import { SubscriptionsTableProps, APIversion, APIsubbed } from './types'
import { APIVersion } from 'components/APICard/types'
import APICard from 'components/APICard'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import CodeIcon from '@material-ui/icons/Code'

const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({ view }) => {
  const classes = useStyles()

  const availableAPIs: Array<APIversion> = [
    {
      API: 'PSD2 Payment Initiation',
      vName: 'Payment Initiation API v1',
      vNumber: 'v 1.04.3.2',
    },
    {
      API: 'PSD2 Payment Initiation',
      vName: 'Payment Initiation API v2',
      vNumber: 'v 2.01.0',
    },
    {
      API: 'Petstore',
      vName: 'Petstore API v1',
      vNumber: 'v 1.2.34',
    },
    {
      API: 'PSD2 Account Information',
      vName: 'AIS STET API v1',
      vNumber: 'v 1.06',
    },
  ]

  const subscribedAPIs: Array<APIsubbed> = [
    {
      API: 'PSD2 Payment Initiation',
      apps: ['TA', 'T2'],
    },
    {
      API: 'Petstore',
      apps: ['TA'],
    },
  ]

  function orderAPIs (list) {
    return list.reduce((acc, APIv) => {
      const { API, ...rest } = APIv
      return { ...acc, [API]: [...(acc[API] || []), rest] }
    }, {})
  }

  function appsList (API: string) {
    const apps = orderAPIs(subscribedAPIs)[API]

    if (apps) {
      return (
        <div className={classes.appsList}>
          {apps[0].apps.map((app: string, indx: number) => (
            <div key={indx} className={classes.avatarContainer}>
              <Avatar className={classes.avatar}>{app}</Avatar>
            </div>
          ))}
        </div>
      )
    } else {
      return null
    }
  }

  function subscriptionsView () {
    if (view === 'list') {
      return (
        <div className={classes.table}>
          {Object.keys(orderAPIs(availableAPIs)).map((API, indx) => (
            <div key={indx} className={classes.apiCategoryContainer}>
              <div className={classes.apiCard}>
                <div className={classes.apiTitle}>
                  {API}
                </div>
                <div className={classes.appsListContainer}>
                  {appsList(API)}
                </div>
                <div className={classes.icons}>
                  <CodeIcon />
                </div>
              </div>
              <div>
                {orderAPIs(availableAPIs)[API].map((APIcard: APIVersion, indx: number) => {
                  const { vName, vNumber } = APIcard
                  return (
                    <APIVersionCard
                      key={indx}
                      vName={vName}
                      vNumber={vNumber}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )
    } else if (view === 'cards') {
      return (
        <div className={classes.cards}>
          <Grid container spacing={3}>
            {Object.keys(orderAPIs(availableAPIs)).map((API, indx) => (
              <Grid key={indx} item xs={12} sm={4}>
                <div className={classes.apiCategoryContainer}>
                  <APICard
                    APIname={API}
                    APIversions={orderAPIs(availableAPIs)[API]}
                  />
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      )
    } else {
      return <div>Something went wrong!</div>
    }
  }

  return subscriptionsView()
}

export default SubscriptionsTable
