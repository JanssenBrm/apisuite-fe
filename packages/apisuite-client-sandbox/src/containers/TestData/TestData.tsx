import * as React from 'react'
import useStyles from './styles'
import Table from 'components/Table'
import Button from '@material-ui/core/Button'
import { useTranslation } from 'react-i18next'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import { HeaderCol } from 'components/Table/types'

const TestData: React.FC<{}> = () => {
  const classes = useStyles()
  const [t] = useTranslation()

  const header: HeaderCol[] = [
    {
      label: 'Sandbox users',
      align: 'left',
      xs: 60,
    },
    {
      label: 'View details',
      align: 'center',
      icons: [<ArrowForwardIosIcon key={0} fontSize='inherit' />],
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

          <div className={classes.navigation}>
            <Button className={classes.btn}>
              Create test user
            </Button>
          </div>
        </div>

        <div className={classes.actionsContainer}>RIGHT</div>
      </section>
    </div>
  )
}

export default TestData
