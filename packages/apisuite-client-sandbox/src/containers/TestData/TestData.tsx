import * as React from 'react'
import useStyles from './styles'
import Table from 'components/Table'
import Card from 'components/Card'
import Button from '@material-ui/core/Button'
import RefreshIcon from '@material-ui/icons/Refresh'
import { useTranslation } from 'react-i18next'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined'

import { HeaderCol } from 'components/Table/types'
import TableNavigation from 'components/TableNavigation'

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

  const apiPkgs = [
    {
      name: 'PSD2 package',
      description: 'Pre-assembled set of accounts with 3 months of transaction history',
    },
    {
      name: 'Petstore',
      description: 'The "hello world" of APIs',
    },
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

            <TableNavigation
              prevLabel='Previous'
              nextLabel='Next'
              maxPages={3}
            />
          </div>
        </div>

        <div className={classes.actionsContainer}>
          <h5 className={classes.heading}>Data Packages</h5>

          <p className={classes.p1}>Select one (optional)</p>

          {apiPkgs.map((pkg, indx) => (
            <Card key={indx} title={pkg.name} description={pkg.description} icon={<UnarchiveOutlinedIcon />} />
          ))}

          <Card title={t('testData.resetSandbox.title')} description={t('testData.resetSandbox.description')} icon={<RefreshIcon />} />
        </div>
      </section>
    </div>
  )
}

export default TestData
