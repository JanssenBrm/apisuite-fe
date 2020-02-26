import * as React from 'react'
import useStyles from './styles'
import Table from 'components/Table'
import { useTranslation } from 'react-i18next'

const TestData: React.FC<{}> = () => {
  const classes = useStyles()
  const [t] = useTranslation()

  const header = [
    {
      label: 'Sandbox users',
      xs: 60,
    },
    {
      label: 'View details',
      xs: 40,
    },
  ]

  const data = [
    ['Thomas Edison', 'most active user'],
    ['Marie Curie', 'new'],
    ['Albert Einstein', 'novice user'],
    ['Nikola Tesla', 'average'],
    ['Pierre-Simon', 'novice user'],
    ['Thomas Edison', 'novice user'],
    ['Marie Curie', 'average'],
    ['Albert Einstein', 'idle user'],
    ['Nikola Tesla', 'new'],
    ['Pierre-Simon', 'new'],
  ]

  return (
    <div className={classes.root}>
      <section className={classes.contentContainer}>
        <div className={classes.mainContainer}>
          <h1 className={classes.title}>{t('testData.title')}</h1>

          <p className={classes.description}>
            {t('testData.description')}
          </p>

          <Table
            header={header}
            data={data}
          />
        </div>

        <div className={classes.actionsContainer}>RIGHT</div>
      </section>
    </div>
  )
}

export default TestData
