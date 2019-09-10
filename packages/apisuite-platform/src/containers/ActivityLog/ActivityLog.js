import React, { Component } from 'react'
import { object, func, number, arrayOf } from 'prop-types'
import { Typography } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import Kpi from 'components/Kpi'
import FormField from 'components/FormField'
import MenuItem from '@material-ui/core/MenuItem'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TableCell from '@material-ui/core/TableCell'
import Pagination from 'components/Pagination'
import { AutoSizer, Column, Table } from 'react-virtualized'
import classnames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import moment from 'moment'

const timeRanges = [
  {
    name: 'Last day',
    value: 'day',
  },
  {
    name: 'Last week',
    value: 'week',
  },
  {
    name: 'Last month',
    value: 'month',
  },
  {
    name: 'Full history',
    value: 'all',
  },
]

const tabs = ['general', 'authorization', 'sandbox', 'user']

const kpisObj = {
  appCount: { tab: 0, action: 'APP_CREATION', value: 'year' },
  testUserLoginCount: { tab: 1, action: 'TEST_USER_LOGIN', value: 'week' },
  portalLoginCount: { tab: 3, action: 'USER_LOGIN', value: 'week' },
}

const styles = theme => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
})

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  }

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props

    return classnames('table-row', classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    })
  }

  parseCellData = (dataKey, data) => {
    switch (dataKey) {
      case 'created':
        return (
          <span>{moment(data).fromNow()}</span>
        )
      case 'creator':
        return (
          <div className='creator-badge'>
            <span>{data.fullName.slice(0, 1)}</span>
          </div>
        )
      default:
        return data
    }
  }

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props
    return (
      <TableCell
        component='div'
        className={classnames(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant='body'
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {this.parseCellData(columns[columnIndex].dataKey, cellData)}
      </TableCell>
    )
  }

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props

    return (
      <TableCell
        component='div'
        className={classnames(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant='head'
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    )
  }

  render () {
    const { classes, columns, ...tableProps } = this.props
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table height={height} width={width} {...tableProps} rowClassName={this.getRowClassName}>
            {columns.map(({ dataKey, ...other }, index) => (
              <Column
                flexGrow={1}
                width={200}
                key={dataKey}
                headerRenderer={headerProps =>
                  this.headerRenderer({
                    ...headerProps,
                    columnIndex: index,
                  })}
                className={classes.flexContainer}
                cellRenderer={this.cellRenderer}
                dataKey={dataKey}
                {...other}
              />
            ))}
          </Table>
        )}
      </AutoSizer>
    )
  }
}

MuiVirtualizedTable.propTypes = {
  classes: object.isRequired,
  columns: arrayOf(object).isRequired,
  headerHeight: number,
  onRowClick: func,
  rowHeight: number,
}

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable)

class ActivityLog extends Component {
  state = {
    selectedTimeRange: timeRanges[0].value,
    selectedTab: 0,
    logs: {
      records: [],
      pagination: {},
    },
    kpis: {},
    ui: {
      loading: false,
    },
  }

  componentDidMount () {
    const { selectedTab } = this.state
    const filters = {
      category: tabs[selectedTab],
      from: +moment().subtract(1, 'day'),
      to: +moment(),
    }

    this.props.fetchActivities(filters)
    this.props.fetchKpis()
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    if (this.props.logs !== nextProps.logs && nextProps.logs.records && nextProps.logs.records.length) {
      this.setState({
        logs: {
          ...nextProps.logs,
          records: nextProps.logs.records.sort((a, b) => +moment(b.created) - +moment(a.created)),
        },
      })
    }

    if (this.props.kpis !== nextProps.kpis) {
      this.setState({ kpis: nextProps.kpis })
    }

    if (this.props.ui !== nextProps.ui) {
      this.setState({ ui: nextProps.ui })
    }
  }

  handleTimeChange = ({ target }) => {
    const filters = {
      category: tabs[this.state.selectedTab],
      from: target.value === 'all' ? 0 : +moment().subtract(1, target.value),
      to: +moment(),
    }

    this.props.fetchActivities(filters)

    this.setState({
      selectedTimeRange: target.value,
    })
  }

  handleTabChange = (event, value) => {
    const { selectedTimeRange } = this.state

    const filters = {
      category: tabs[value],
      from: selectedTimeRange === 'all' ? 0 : +moment().subtract(1, selectedTimeRange),
      to: +moment(),
    }
    this.props.fetchActivities(filters)

    this.setState({ selectedTab: value })
  }

  handleChangePage = page => {
    const { selectedTab, selectedTimeRange } = this.state

    const filters = {
      page,
      pageSize: 50,
      category: tabs[selectedTab],
      from: selectedTimeRange === 'all' ? 0 : +moment().subtract(1, selectedTimeRange),
      to: +moment(),
    }
    this.props.fetchActivities(filters)
  }

  checkRole = userRole => {
    const { user } = this.props

    return user.roles && !!user.roles.find(r => r.role === userRole && r.organizationId === user.organizations[0].id)
  }

  handleKPIClick = (kpi) => {
    const filters = {
      category: tabs[kpi.tab],
      from: +moment().subtract(1, kpi.value),
      to: +moment(),
      action: kpi.action,
    }
    this.props.fetchActivities(filters)
    const timeRange = kpi.value === 'year' ? 'all' : kpi.value
    this.setState({ selectedTab: kpi.tab, selectedTimeRange: timeRange })
  }

  render () {
    const { selectedTimeRange, selectedTab, logs, kpis, ui } = this.state
    const { intl } = this.props
    const appsCreated = intl.formatMessage({ id: 'activityLog.kpi.apps' })
    const testuserLogins = intl.formatMessage({ id: 'activityLog.kpi.testuser' })
    const portalLogins = intl.formatMessage({ id: 'activityLog.kpi.portal' })
    const lastWeek = intl.formatMessage({ id: 'activityLog.kpi.week' })
    const lastYear = intl.formatMessage({ id: 'activityLog.kpi.year' })
    const generalActivities = intl.formatMessage({ id: 'activityLog.tab.general' })
    const authActivities = intl.formatMessage({ id: 'activityLog.tab.auth' })
    const sandboxActivities = intl.formatMessage({ id: 'activityLog.tab.sandbox' })
    const userActivities = intl.formatMessage({ id: 'activityLog.tab.user' })
    const timeLabel = intl.formatMessage({ id: 'activityLog.column.time' })
    const creatorLabel = intl.formatMessage({ id: 'activityLog.column.creator' })
    const actionLabel = intl.formatMessage({ id: 'activityLog.column.action' })
    const infoLabel = intl.formatMessage({ id: 'activityLog.column.info' })

    const isAdmin = this.checkRole('ADMIN')
    const isSales = this.checkRole('SALES')

    return (
      <div className='activity-container'>
        <div className='activity-wrapper'>
          <Typography variant='display4'><FormattedMessage id='activityLog.title' /></Typography>
          <div className='activity-header'>
            <FormField
              className='activity-input'
              id='activity-time-range'
              testid='activity-time-range'
              name='selectedTimeRange'
              type='select'
              displayKey='name'
              fullWidth
              usevalue='true'
              value={selectedTimeRange}
              data={timeRanges}
              onChange={this.handleTimeChange}
            >
              {timeRanges.map((p, idx) => (
                <MenuItem
                  key={idx}
                  value={p.value}
                >
                  {p.name}
                </MenuItem>
              ))}
            </FormField>
            <div className='kpi-wrapper'>
              {(kpis.appCount || kpis.appCount === 0) && (
                <Kpi
                  title={appsCreated}
                  subtitle={lastYear}
                  value={kpis.appCount}
                  onClick={() => this.handleKPIClick(kpisObj.appCount)}
                />
              )}
              {(kpis.testUserLoginCount || kpis.testUserLoginCount === 0) && (
                <Kpi
                  title={testuserLogins}
                  subtitle={lastWeek}
                  value={kpis.testUserLoginCount}
                  onClick={() => this.handleKPIClick(kpisObj.testUserLoginCount)}
                />
              )}
              {(kpis.portalLoginCount || kpis.portalLoginCount === 0) && (
                <Kpi
                  title={portalLogins}
                  subtitle={lastWeek}
                  value={kpis.portalLoginCount}
                  onClick={() => this.handleKPIClick(kpisObj.portalLoginCount)}
                />
              )}
            </div>
          </div>
          <div className='table-container'>
            <Tabs
              variant='fullWidth'
              classes={{ root: 'tabs', flexContainer: 'tabs-flex' }}
              value={selectedTab}
              indicatorColor='primary'
              textColor='primary'
              onChange={this.handleTabChange}
            >
              <Tab classes={{ root: 'tab', label: 'tab-label' }} label={generalActivities} disabled={isSales} />
              <Tab classes={{ root: 'tab', label: 'tab-label' }} label={authActivities} disabled={isSales} />
              <Tab classes={{ root: 'tab', label: 'tab-label' }} label={sandboxActivities} disabled={isSales} />
              <Tab classes={{ root: 'tab', label: 'tab-label', disabled: 'tab-disabled' }} label={userActivities} disabled={isSales || !isAdmin} />
            </Tabs>
            <Paper className='paper-wrapper'>
              {logs.records && logs.records.length > 0 ? (
                <VirtualizedTable
                  rowCount={logs.records ? logs.records.length : 0}
                  rowGetter={({ index }) => logs.records[index]}
                  columns={[
                    {
                      label: timeLabel,
                      dataKey: 'created',
                    },
                    {
                      width: 100,
                      label: creatorLabel,
                      dataKey: 'creator',
                    },
                    {
                      label: actionLabel,
                      dataKey: 'action',
                    },
                    {
                      width: 300,
                      label: infoLabel,
                      dataKey: 'additionalInfo',
                    },
                  ]}
                />
              ) : (
                <div className='empty-table'>
                  <FormattedMessage id='activityLog.empty' />
                </div>
              )}
              {ui.loading && (
                <div className='loading'>
                  <CircularProgress className='loading-circle' />
                </div>
              )}
            </Paper>
          </div>
          {logs.pagination &&
            <Pagination
              items={logs.records}
              pager={logs.pagination}
              onChangePage={this.handleChangePage}
            />}
        </div>
      </div>
    )
  }
}

ActivityLog.propTypes = {
  intl: object.isRequired,
  user: object.isRequired,
  logs: object.isRequired,
  kpis: object.isRequired,
  ui: object.isRequired,
  fetchActivities: func.isRequired,
  fetchKpis: func.isRequired,
}

export default ActivityLog
