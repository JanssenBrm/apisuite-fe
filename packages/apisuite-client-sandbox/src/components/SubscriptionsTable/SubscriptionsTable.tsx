import * as React from 'react'
import useStyles from './styles'
import APIVersionCard from 'components/APIVersionCard'
import { SubscriptionsTableProps, APIversion, APIsubbed, App } from './types'
import { APIVersion } from 'components/APICard/types'
import APICard from 'components/APICard'
import Grid from '@material-ui/core/Grid'
import CodeIcon from '@material-ui/icons/Code'
import SubscriptionSelect from 'components/SubscriptionSelect'

const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({ view }) => {
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
    {
      API: 'PSD2 Account Information',
      apps: [],
    },
  ]

  // const userApps: Array<App> = [
  //   {
  //     title: 'TA',
  //   },
  //   {
  //     title: 'T2',
  //   },
  //   {
  //     title: 'B2',
  //   },
  //   {
  //     title: 'RCT',
  //   },
  // ]

  function getApps (subscribedAPIs: Array<APIsubbed>) {
    const appSub: any = []
    subscribedAPIs.map((api) => {
      appSub.push(api.apps)
    })
    return appSub
  }

  const classes = useStyles()
  const [appSub, setAppSub] = React.useState(getApps(subscribedAPIs))

  function orderAPIs (list: any) {
    return list.reduce((acc: any, APIv: any) => {
      const { API, ...rest } = APIv
      return { ...acc, [API]: [...(acc[API] || []), rest] }
    }, {})
  }

  const handleDelete = (app: App, apiNumber: number) => () => {
    const indx: number = appSub[apiNumber].indexOf(app)
    const newAppSub: any = [...appSub]

    newAppSub[apiNumber].splice(indx, 1)
    setAppSub(newAppSub)
  }

  function subscriptionsView () {
    if (view === 'list') {
      return (
        <div className={classes.table}>
          {console.log(appSub)}
          {Object.keys(orderAPIs(availableAPIs)).map((API, indx) => (
            <div key={indx} className={classes.apiCategoryContainer}>
              <div className={classes.apiCard}>
                <div className={classes.apiTitle}>
                  {API}
                </div>
                <div className={classes.appsListContainer}>
                  <SubscriptionSelect
                    apps={appSub[indx]}
                    handleDelete={handleDelete}
                    apiNumber={indx}
                  />
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
