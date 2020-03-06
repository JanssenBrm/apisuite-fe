import * as React from 'react'
import clsx from 'clsx'

import useCommonStyles from '../styles'
import useStyles from './styles'
import { ListAppsProps } from './types'
import AppCard from 'components/AppCard'
import Grid from '@material-ui/core/Grid'

import { docs } from './config'

import { useTranslation } from 'react-i18next'

const ListApps: React.FC<ListAppsProps> = ({ history, user, userApps, getUserApps }) => {
  const commonClasses = useCommonStyles()
  const classes = useStyles()
  const [t] = useTranslation()

  function handleAppClick (event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    history.push(`/dashboard/apps/detail/${event.currentTarget.id}`)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  function handleCreateClick () {
    history.push('/dashboard/apps/create')
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  React.useEffect(() => {
    if (user) {
      getUserApps(user.id)
    }
  }, [])

  return (
    <div className={commonClasses.root}>
      <section className={commonClasses.contentContainer}>
        <h1 className={classes.title}>{t('listApps.overview.title')}</h1>

        <div className={classes.appsContainer}>
          <Grid container spacing={3}>
            {userApps.map((userApp, indx) => {
              if (userApp.enable) {
                return (
                  <Grid item key={indx} xs={12} sm={3}>
                    <AppCard
                      id={userApp.appId.toString()}
                      name={userApp.name}
                      onClick={handleAppClick}
                      appId={userApp.appId}
                      userId={user ? user.id : undefined}
                      history={history}
                    />
                  </Grid>
                )
              } else {
                return null
              }
            })}
            <Grid item xs={12} sm={3}>
              <AppCard
                name=''
                addVariant
                onClick={handleCreateClick}
              />
            </Grid>
          </Grid>
        </div>
      </section>

      <div className={classes.docsContainer}>
        <section className={commonClasses.contentContainer}>
          <h1 className={classes.title}>{t('listApps.description.title')}</h1>

          <br />

          <div className={classes.docs}>
            {docs.map((doc, index) => (
              <div key={doc.key} className={clsx(classes.doc, { [classes.middleDocSpace]: index === 1 })}>
                <div className={classes.docImgContainer}>
                  <img src={doc.img} />
                </div>

                <h1>{doc.title}</h1>

                <p>{doc.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default ListApps
