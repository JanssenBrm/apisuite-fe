import * as React from 'react'
import useStyles from './styles'
import Table from 'components/Table'
import Card from 'components/Card'
import Button from '@material-ui/core/Button'
import RefreshIcon from '@material-ui/icons/Refresh'
import { useTranslation } from 'react-i18next'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import { HeaderCol } from 'components/Table/types'
import TableNavigation from 'components/TableNavigation'
import { TestDataProps } from './types'

const TestData: React.FC<TestDataProps> = ({ history }) => {
  const classes = useStyles()
  const [t] = useTranslation()
  const [tablePage, setTablePage] = React.useState(1)
  const [disableNav, setDisableNav] = React.useState({
    previous: false,
    next: false,
  })
  const nrRows = 10

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
    ['Maxwell', 'idle user'],
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

  function onPageClick (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setTablePage(parseInt(event.currentTarget.id))
  }

  function navigateClick (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const goTo = parseInt(event.currentTarget.id)
    setTablePage(tablePage + goTo)
  }

  function onClickCreate () {
    history.push('/dashboard/test/create')
  }

  function onClickUser (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    history.push(`/dashboard/test/data/${event.currentTarget.id}`)
  }

  React.useEffect(() => {
    setDisableNav({
      previous: tablePage - 1 <= 0,
      next: tablePage + 1 > ((data.length % nrRows) + 1),
    })
  }, [tablePage])

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
            data={data.slice((tablePage - 1) * nrRows, (tablePage * nrRows))}
            onRowClick={onClickUser}
          />

          <div className={classes.navigation}>
            <Button className={classes.btn} onClick={onClickCreate}>
              Create test user
            </Button>

            <TableNavigation
              prevLabel='Previous'
              nextLabel='Next'
              tablePage={tablePage}
              maxPages={(data.length % nrRows) + 1}
              onPageClick={onPageClick}
              navigateClick={navigateClick}
              disableNav={disableNav}
            />
          </div>
        </div>

        <div className={classes.actionsContainer}>

          <div className={classes.sandboxCard}>
            <h4 className={classes.cardTitle}>Sandbox age</h4>
            <p className={classes.units}>Days since creation</p>
            <div className={classes.cardInfo}>
              <h3 className={classes.unitsDays}>24 days</h3>
              <InfoOutlinedIcon className={classes.infoIcon} />
            </div>
          </div>

          <h5 className={classes.heading}>Data Packages</h5>

          <p className={classes.p1}>Select one (optional)</p>

          {apiPkgs.map((pkg, indx) => (
            <Card key={indx} title={pkg.name} description={pkg.description} icon={<UnarchiveOutlinedIcon />} />
          ))}

          <Card title={t('testData.resetSandbox.title')} description={t('testData.resetSandbox.description')} icon={<RefreshIcon />} />

          <h6 className={classes.actions}>Additional actions</h6>
          <a className={classes.a}>Connect GraphQL source</a>

        </div>
      </section>
    </div>
  )
}

export default TestData
