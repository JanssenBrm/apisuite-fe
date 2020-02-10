import * as React from 'react'
import useStyles from './styles'
import ApiCard from 'components/ApiCard'
import { SubscriptionsTableProps } from './types'
import ApiCategoryCard from 'components/ApiCategoryCard/ApiCategoryCard'

const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({ view }) => {
  const classes = useStyles()

  const subscriptions = [
    {
      category: 'PSD2 Payment Initiations',
      api: 'api1',
      apps: ['TA1', 'TA2'],
      version: 'v1.03.2',
    },
    {
      category: 'PSD2 Payment Initiations',
      api: 'api2',
      apps: ['TA1', 'TA2'],
      version: 'v2.08',
    },
    {
      category: 'PSD2 Payment Initiations',
      api: 'api3',
      apps: [],
      version: 'v4.5.1',
    },
    {
      category: 'Petstore',
      api: 'api4',
      apps: ['A2'],
      version: 'v8.2',
    },
    {
      category: 'Starwars',
      api: 'api5',
      apps: ['TF4', 'TF5'],
      version: 'v3.02.1',
    },
    {
      category: 'Starwars',
      api: 'api6',
      apps: [],
      version: 'v2.2',
    },
  ]

  const apis = subscriptions.reduce((acc: any, api: any) => {
    const { category, ...rest } = api
    return { ...acc, [category]: [...(acc[category] || []), rest] }
  }, {})

  function appsView () {
    if (view === 'list') {
      return (
        <div className={classes.table}>
          {Object.keys(apis).map((category, indx) => (
            <div key={indx} className={classes.apiCategoryContainer}>
              <div className={classes.apiTitle}>
                {category}
              </div>
              <div>
                {apis[category].map(({ api, apps, version }, indx) => (
                  <ApiCard key={indx} name={api} apps={apps} version={version} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )
    } else if (view === 'cards') {
      return (
        <div className={classes.cards}>
          {Object.keys(apis).map((category, indx) => (
            <div key={indx} className={classes.apiCategoryContainer}>
              {apis[category].map(({ api, apps, version }, indx) => (
                <ApiCategoryCard key={indx} name={api} apps={apps} version={version} />
              ))}
            </div>
          ))}
        </div>
      )
    } else {
      return <div>Something went wrong.</div>
    }
  }

  return appsView()
}

export default SubscriptionsTable
