import * as React from 'react'
import useStyles from './styles'
import APIVersionCard from 'components/APIVersionCard'
import { SubscriptionsTableProps, ViewType } from './types'
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

const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({
  apisByName,
  user,
  getApis,
  getUserApps,
  removeAppSubscription,
  addAppSubscription,
  userApps,
}) => {
  const classes = useStyles()
  const [t] = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorElFilter, setAnchorElFilter] = React.useState(null)
  const [selectedApi, setSelectedApi] = React.useState('')
  const [filter, setFilter] = React.useState('')
  const [view, setView] = React.useState<ViewType>('list')
  const open = Boolean(anchorEl)
  const filterOpen = Boolean(anchorElFilter)

  // TODO: use this and all other toggle states with useReducer
  function changeView () {
    if (view === 'list') {
      setView('cards')
    } else {
      setView('list')
    }
  }

  React.useEffect(() => {
    if (user) getUserApps(user.id)
    getApis()
  }, [])

  const handleDelete = (appId: number, apiName: string) => () => {
    removeAppSubscription(appId, apiName)
  }

  const handleAdd = (appId: number, apiName: string) => () => {
    addAppSubscription(appId, apiName)
  }

  const handleClick = (apiName: string) => (event: any) => {
    setAnchorEl(event.currentTarget)
    setSelectedApi(apiName)
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

            {apisByName.length > 0 && apisByName.filter(api => api.name.toLowerCase().includes(filter.toLowerCase()))
              .map((api, indx: number) => (
                <div key={indx} className={classes.apiContainer}>
                  <div className={classes.apiCard}>
                    <div className={classes.apiTitle}>
                      {api.name}
                    </div>

                    <div className={classes.appsListContainer}>
                      <SubscriptionSelect
                        apps={api.apps}
                        apiName={api.name}
                        handleDelete={handleDelete}
                        handleClick={handleClick}
                      />
                    </div>

                    <div className={classes.icons}>
                      <CodeIcon />
                    </div>
                  </div>
                  <div>
                    {api.versions.map((version, indx: number) => {
                      return (
                        <APIVersionCard
                          key={indx}
                          apiTitle={version.apiTitle}
                          versionName={version.versionName}
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
                userApps={userApps}
                handleAdd={handleAdd}
                apiName={selectedApi}
              />
            </Popover>

          </div>
        )
      }

      case 'cards': {
        return (
          <div className={classes.cards}>
            <Grid container spacing={3}>
              {apisByName.length > 0 && apisByName.filter(api => api.name.toLowerCase().includes(filter.toLowerCase()))
                .map((api, indx: number) => (
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
                            apiName={api.name}
                            handleDelete={handleDelete}
                            handleClick={handleClick}
                          />
                        </div>
                      </div>

                      <div>
                        {api.versions.map((APIversion, indx) => (
                          <div key={indx} className={classes.apiVersionCard}>
                            <div>{APIversion.apiTitle}</div>
                            <div className={classes.vNumber}>{APIversion.versionName}</div>
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
                userApps={userApps}
                handleAdd={handleAdd}
                apiName={selectedApi}
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
        {apisByName.length > 0 && apisByName.map((api, indx: number) => (
          <MenuItem onClick={handleFilterClick(api.name)} key={indx}>{api.name}</MenuItem>
        ))}
      </Popover>

      {subscriptionsView()}
    </div>
  )
}

export default SubscriptionsTable
