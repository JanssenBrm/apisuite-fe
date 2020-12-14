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
import Link from 'components/Link'
import CircularProgress from '@material-ui/core/CircularProgress'

const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({
  apisByName,
  user,
  getApis,
  getUserApps,
  removeAppSubscription,
  addAppSubscription,
  userApps,
  subscribing,
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
                      // TODO the link to should be a passed property leaving api products fallback
                      return (
                        <Link key={indx} className={classes.apiVersionLink} to={`/api-products/details/${version.apiId}/spec/${version.id}`}>
                          <APIVersionCard
                            apiTitle={version.title}
                            versionName={version.version}
                          />
                        </Link>
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
                          // TODO the link to should be a passed property leaving api products fallback
                          <Link key={indx} className={classes.apiVersionLink} to={`/api-products/details/${APIversion.apiId}/spec/${APIversion.id}`}>
                            <div className={classes.apiVersionCard}>
                              <div>{APIversion.title}</div>
                              <div className={classes.vNumber}>{APIversion.version}</div>
                            </div>
                          </Link>
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

  const showEmptyMsg = () => {
    return (
      <div className={classes.empty}>
        <p>No subscriptions available</p>
        <Link
          className={classes.emptyURL}
          to='https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/580517951/API+Subscriptions'
        >
          What are subscriptions all about
        </Link>
      </div>
    )
  }

  const loadingView = () => {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress size={50} className={classes.loading} />
      </div>
    )
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

      {subscribing.isRequesting && loadingView()}

      {apisByName.length > 0 ? subscriptionsView() : showEmptyMsg()}
    </div>
  )
}

export default SubscriptionsTable
