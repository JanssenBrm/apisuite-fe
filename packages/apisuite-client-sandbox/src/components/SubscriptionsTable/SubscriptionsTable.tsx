import * as React from 'react'
import useStyles from './styles'
import APIVersionCard from 'components/APIVersionCard'
import { SubscriptionsTableProps, ViewType } from './types'
import { API, APIversion } from 'containers/Subscriptions/types'
import Grid from '@material-ui/core/Grid'
import CodeIcon from '@material-ui/icons/Code'
import SubscriptionSelect from 'components/SubscriptionSelect'
import AmpStoriesOutlinedIcon from '@material-ui/icons/AmpStoriesOutlined'
import CalendarViewDayOutlinedIcon from '@material-ui/icons/CalendarViewDayOutlined'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ApiSelect from 'components/ApiSelect'
import Popover from '@material-ui/core/Popover'
import MenuItem from '@material-ui/core/MenuItem'
import { useTranslation } from 'react-i18next'

const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({ subscriptions, deleteAppSub, addAppSub }) => {
  const classes = useStyles()
  const [t] = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorElFilter, setAnchorElFilter] = React.useState(null)
  const [popApiId, setPopApiId] = React.useState(0)
  const [filter, setFilter] = React.useState('')
  const [view, setView] = React.useState<ViewType>('list')
  const open = Boolean(anchorEl)
  const filterOpen = Boolean(anchorElFilter)

  function changeView () {
    if (view === 'list') {
      setView('cards')
    } else {
      setView('list')
    }
  }

  const handleDelete = (id: number, idApp: number) => () => {
    deleteAppSub(id, idApp)
  }

  const handleAdd = (APIid: number, appName: string) => () => {
    const indx = subscriptions.subscribedAPIs.map(api => api.id).indexOf(APIid)
    const newAppNumber = subscriptions.subscribedAPIs[indx].apps.length
    addAppSub(APIid, appName, newAppNumber)
  }

  const handleClick = (APIid: number) => (event: any) => {
    setAnchorEl(event.currentTarget)
    setPopApiId(APIid)
  }

  const handleClickFilter = (event: any) => {
    setAnchorElFilter(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleCloseFilter = () => {
    setAnchorElFilter(null)
  }

  const handleFilterClick = (apiName: string) => () => {
    setFilter(apiName)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement |
  HTMLTextAreaElement>) => {
    setFilter(event.target.value)
  }

  function subscriptionsView () {
    switch (view) {
      case 'list': {
        return (
          <div className={classes.table}>
            <div className={classes.header}>
              <div>{t('subscriptionsTable.header')}</div>
              <div className={classes.actions}>{t('subscriptionsTable.actions')}</div>
            </div>
            {subscriptions.subscribedAPIs.filter(api => api.name.toLowerCase().includes(filter.toLowerCase()))
              .map((api: API, indx: number) => (
                <div key={indx} className={classes.apiContainer}>
                  <div className={classes.apiCard}>
                    <div className={classes.apiTitle}>
                      {api.name}
                    </div>
                    <div className={classes.appsListContainer}>
                      <SubscriptionSelect
                        apps={api.apps}
                        handleDelete={handleDelete}
                        APIid={api.id}
                        handleClick={handleClick}
                      />
                    </div>

                    <div className={classes.icons}>
                      <CodeIcon />
                    </div>
                  </div>
                  <div>
                    {api.versions.map((APIcard: APIversion, indx: number) => {
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

            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <ApiSelect
                userApps={subscriptions.userApps}
                handleAdd={handleAdd}
                APIid={popApiId}
              />
            </Popover>

          </div>
        )
      }

      case 'cards': {
        return (
          <div className={classes.cards}>
            <Grid container spacing={3}>
              {subscriptions.subscribedAPIs.filter(api => api.name.toLowerCase().includes(filter.toLowerCase()))
                .map((api: API, indx: number) => (
                  <Grid key={indx} item xs={12} sm={4}>
                    <div className={classes.cardContainer}>
                      <div className={classes.apiDetail}>
                        <h4 className={classes.cardTitle}>{api.name}</h4>

                        <p className={classes.description}>
                          {api.description}
                        </p>

                        <div className={classes.appsListCardContainer}>
                          <SubscriptionSelect
                            apps={api.apps}
                            handleDelete={handleDelete}
                            APIid={api.id}
                            handleClick={handleClick}
                          />
                        </div>
                      </div>

                      <div>
                        {api.versions.map((APIversion, indx) => (
                          <div key={indx} className={classes.apiVersionCard}>
                            <div>{APIversion.vName}</div>
                            <div className={classes.vNumber}>{APIversion.vNumber}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Grid>
                ))}
            </Grid>

            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <ApiSelect
                userApps={subscriptions.userApps}
                handleAdd={handleAdd}
                APIid={popApiId}
              />
            </Popover>

          </div>
        )
      }

      default: {
        return <div>Something went wrong!</div>
      }
    }
  }

  return (
    <div className={classes.viewContainer}>
      <div className={classes.viewRow}>
        <div className={classes.optionsContainer}>
          <input
            placeholder='Filter...'
            name='filter'
            type='text'
            value={filter}
            onChange={handleChange}
            className={classes.filter}
          />
          <ExpandMoreIcon className={classes.icon} onClick={handleClickFilter} />
          <div className={classes.viewIconContainer} onClick={changeView}>
            {(view === 'list') ? <AmpStoriesOutlinedIcon /> : <CalendarViewDayOutlinedIcon />}
          </div>
        </div>
      </div>

      <Popover
        open={filterOpen}
        anchorEl={anchorElFilter}
        onClose={handleCloseFilter}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {subscriptions.subscribedAPIs.map((api: API, indx: number) => (
          <MenuItem onClick={handleFilterClick(api.name)} key={indx}>{api.name}</MenuItem>
        ))}
      </Popover>

      {subscriptionsView()}
    </div>
  )
}

export default SubscriptionsTable
