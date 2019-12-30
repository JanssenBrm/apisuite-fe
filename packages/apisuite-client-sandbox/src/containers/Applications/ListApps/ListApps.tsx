import * as React from 'react'
import clsx from 'clsx'

import useCommonStyles from '../styles'
import useStyles from './styles'
import { ListAppsProps } from './types'
import AppCard from 'components/AppCard'

import { docs } from './config'
import SvgIcon from 'components/SvgIcon'

import { useTranslation } from 'react-i18next'

const ListApps: React.FC<ListAppsProps> = ({ history }) => {
  const commonClasses = useCommonStyles()
  const classes = useStyles()
  const [t] = useTranslation()

  function handleAppClick () {
    history.push('/dashboard/apps/detail')
  }

  function handleCreateClick () {
    history.push('/dashboard/apps/create')
  }

  return (
    <div className={commonClasses.root}>
      <section className={commonClasses.contentContainer}>
        <h1 className={classes.title}>{t('listApps.overview.title')}</h1>

        <div className={classes.appsContainer}>
          <AppCard name='Example app' onClick={handleAppClick} />
          <AppCard name='' addVariant onClick={handleCreateClick} />
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

                <div className={classes.spacer} />

                <div className={classes.readMore}>
                  <SvgIcon name='chevron-right-circle' size={28} /> &nbsp;&nbsp; <span>{t('listApps.buttons.readMore')}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default ListApps
