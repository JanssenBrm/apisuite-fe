import React, { Component } from 'react'
import { func, object, bool } from 'prop-types'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import classnames from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import Tooltip from 'components/Tooltip'
import consoleIcon from 'assets/console_icon.svg'
import statsIcon from 'assets/stats_icon.svg'
import caretLeftIcon from 'assets/circle_caret_left.svg'
import scenariosIcon from 'assets/scenarios.svg'
import powerSettingsIcon from 'assets/power_settings.svg'
import avatarDefaultIcon from 'assets/avatar_default.svg'
import { Typography } from '@material-ui/core'

/*
 * Navigation options:
 *
 * protected: Will only show up on the navigation if the user is authenticated
 * disabled: Will have a disabled UI and disabled click action
 * hide: The whole SubMenu will be hidden in this specific route
 * hidden: The button is permantently hidden from the menu
 */

let appBarMenu = [
  {
    name: 'api-products',
    intlId: 'navigation.apiProducts',
    submenu: [
      { name: 'overview', tag: 'api-overview', intlId: 'navigation.overview', route: '/', protected: true },
      { name: 'feedback', intlId: 'navigation.feedback', route: '/feedback', protected: true },
      { name: 'subscriptions', intlId: 'navigation.subscriptions', route: '/api-subscriptions', protected: true, optional: true },
      { name: 'status', route: '/api-status', icon: statsIcon, disabled: true, protected: true, tooltip: 'API Status' },
    ],
  },
  {
    name: 'documentation',
    intlId: 'navigation.docs',
    submenu: [
      { name: 'overview', tag: 'docs-overview', intlId: 'navigation.docs.overview', route: '/docs' },
      { name: 'gettingstarted', intlId: 'navigation.docs.gettingstarted', route: '/docs/started' },
      { name: 'references', intlId: 'navigation.docs.references', route: '/api-references', protected: true },
      { name: 'resources', intlId: 'navigation.docs.resources', route: '/external-resources', protected: true, disabled: true },
      { name: 'scenarios', icon: scenariosIcon, route: '/scenarios', tooltip: 'Scenarios' },
      { name: 'api', intlId: 'navigation.docs.api', route: '/api', protected: true, hidden: true },
    ],
  },
  {
    name: 'support',
    intlId: 'navigation.support',
    route: '/support',
  },
  {
    name: 'dashboard',
    intlId: 'navigation.manageApps',
    submenu: [
      { name: 'overview', tag: 'dashboard-overview', intlId: 'navigation.overview', route: '/dashboard' },
      { name: 'apps', intlId: 'navigation.apps', route: '/apps' },
      { name: 'testdata', intlId: 'navigation.testData', route: '/testdata', optional: true },
      { name: 'activitylog', intlId: 'navigation.activityLog', route: '/activity-log', disabled: true },
      // { name: 'users', intlId: 'navigation.users', route: '/users', disabled: true },
      { name: 'console', route: '/api-console', icon: consoleIcon, disabled: true, tooltip: 'API Console' },
    ],
  },
  {
    name: 'login',
    intlId: 'navigation.login',
    route: '/login',
  },
  {
    name: 'signup',
    intlId: 'navigation.registration',
    route: '/signup',
  },
  {
    name: 'user',
    submenu: [
      { name: 'profile', intlId: 'navigation.profile', route: '/profile' },
      { name: 'security', intlId: 'navigation.security', route: '/profile' },
      { name: 'team', intlId: 'navigation.team', route: '/team' },
      { name: 'codes', intlId: 'navigation.codes', route: '/recovery-codes', hidden: true },
      { name: 'organisation', intlId: 'navigation.organisation', route: '/organisation' },
      { name: 'logout', route: '/logout', icon: powerSettingsIcon, tooltip: 'Logout' },
    ],
  },
]

const userMenu = appBarMenu[appBarMenu.length - 1]

class Navigation extends Component {
  state = {
    selectedMenu: null,
    selectedSubmenu: null,
    isTop: true,
    isOutsideDetailHeader: false,
    drawer: false,
  }

  checkThemeFeatures = () => {
    const { features } = this.props.theme

    return features && features.length ? appBarMenu.reduce((acc, curr) => {
      if ((features.includes(curr.name) && curr.optional) || !curr.optional) {
        if (curr.submenu) {
          return [
            ...acc, {
              ...curr,
              submenu: curr.submenu.filter(sub => (sub.optional && features.includes(sub.name)) || !sub.optional),
            },
          ]
        }
        return [...acc, curr]
      }
    }, []) : appBarMenu
  }

  syncState = (pathname, defaultMenu) => {
    const { isLoggedIn } = this.props
    appBarMenu = this.checkThemeFeatures()

    const currentMenu = appBarMenu.find(menu =>
      menu.route === pathname || (menu.submenu && menu.submenu.find(sub => sub.route === pathname || `${sub.route}/${pathname.replace(/^.+?(\/)/, '')}` === pathname || sub.route === pathname.split('/').slice(0, -1).join('/')))
    )

    const currentSubmenu = currentMenu && currentMenu.submenu ? currentMenu.submenu.find(sub =>
      sub.route === pathname || `${sub.route}/${pathname.replace(/^.+?(\/)/, '')}` === pathname || (['apps', 'testdata'].includes(sub.name) && sub.route === pathname.split('/').slice(0, -1).join('/'))
    ) : null
    let hasSubmenu = false

    if (currentSubmenu) {
      const unprotectedItems = currentMenu.submenu.filter(submenu => !submenu.protected)
      hasSubmenu = currentSubmenu.hide ? false : unprotectedItems.length > 0 || isLoggedIn
    }

    this.props.checkExpanded(hasSubmenu)
    this.setState({ selectedMenu: currentMenu || defaultMenu, selectedSubmenu: currentSubmenu })
  }

  UNSAFE_componentWillMount () {
    const { pathname } = this.props.location
    const defaultMenu = appBarMenu[0]
    this.syncState(pathname, defaultMenu)
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { pathname } = nextProps.location
    if (this.props.location.pathname !== pathname) {
      const defaultMenu = pathname === '/dashboard' ? appBarMenu[3] : appBarMenu[0]
      this.syncState(pathname, defaultMenu)
    }
  }

  componentDidMount () {
    document.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  displayMenuItem = (menu) => {
    const { isLoggedIn, isUserActivated } = this.props

    return (
      (
        (menu.name === 'dashboard' && isLoggedIn && isUserActivated) ||
        (menu.name === 'login' && !isLoggedIn) ||
        (menu.name === 'signup' && (!isLoggedIn || !isUserActivated)) ||
        (menu.name === 'documentation' && isLoggedIn && isUserActivated)
      ) ||
      (
        menu.name !== 'dashboard' &&
        menu.name !== 'login' &&
        menu.name !== 'signup' &&
        menu.name !== 'documentation'
      )
    )
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    })
  };

  navigate = route => () => this.props.history.push(route)

  handleScroll = () => {
    const isTop = (window.scrollY || window.pageYOffset) < 50
    const isOutsideDetailHeader = (window.scrollY || window.pageYOffset) > 20

    if (isTop !== this.state.isTop || isOutsideDetailHeader !== this.state.isOutsideDetailHeader) {
      this.setState({ isTop, isOutsideDetailHeader })
    }
  }

  handleLogoClick = () => {
    this.setState({ selectedMenu: appBarMenu[0], selectedSubmenu: appBarMenu[0].submenu[0] })
    this.props.history.push('/')
  }

  handleUserClick = () => {
    this.setState({ selectedMenu: userMenu, selectedSubmenu: userMenu.submenu[0] })
    this.props.history.push(userMenu.submenu[0].route)
  }

  handleMenuClick = menu => () => {
    const { history, openLoginModal, openSupportModal } = this.props
    if (menu.submenu) {
      const currentMenu = appBarMenu.find(item => item.name === menu.name)
      this.setState({ selectedMenu: menu, selectedSubmenu: currentMenu.submenu[0] })
      history.push(currentMenu.submenu[0].route)
    } else {
      if (menu.name === 'support') {
        openSupportModal()
      } else if (menu.name === 'login') {
        openLoginModal()
      } else {
        this.setState({ selectedMenu: menu, selectedSubmenu: null })
        history.push(menu.route)
      }
    }
  }

  handleSubmenuClick = submenu => () => {
    this.setState({ selectedSubmenu: submenu })

    if (this.state.selectedMenu.name === 'user') {
      if (submenu.route === '/logout') {
        this.props.logout()
      } else {
        this.props.history.push(submenu.route)

        const scrollingElement = document.getElementById(`${submenu.name}-settings`)
        if (scrollingElement) {
          const top = scrollingElement.offsetTop - 165
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }
    } else {
      if (submenu.route === '/docs') {
        this.props.changeTopic(null, null)
      }

      if (submenu.route === '/docs/started') {
        this.props.changeTopic(0, 0)
      }

      if (submenu.route === '/feedback') {
        this.props.openSupportModal('incident')
      } else {
        this.props.history.push(submenu.route)
      }
    }
  }

  hideSubmenuItems = () => {
    const { history } = this.props
    const { pathname } = history.location

    const isCodes = pathname === '/recovery-codes'

    return isCodes
  }

  renderMenu = () => {
    const { isLoggedIn, history, theme } = this.props
    const { pathname } = history.location
    const { selectedMenu, isTop } = this.state
    const hasTransparentBG = !theme.staticNavigation && ['/', '/dashboard', '/recovery'].includes(pathname)
    const menuOptions = appBarMenu.slice(0, -1)

    return (
      <div
        className={classnames(
          'menu app-bar-menu',
          { 'logged-in': isLoggedIn }
        )}
      >
        {menuOptions.map(menu =>
          this.displayMenuItem(menu) &&
            <Button
              id={`${menu.name}-menu`}
              testid={`${menu.name}-menu`}
              key={menu.name}
              className={classnames({ selected: selectedMenu.name === menu.name })}
              onClick={this.handleMenuClick(menu)}
              style={menu.disabled ? { opacity: '.5' } : null}
              disabled={menu.disabled}
            >
              <FormattedMessage id={menu.intlId} />
              {menu.submenu && hasTransparentBG && isLoggedIn && isTop && <KeyboardArrowDownIcon className='caret-icon' />}
            </Button>
        )}
      </div>
    )
  }

  renderSubmenu = () => {
    const { isLoggedIn, history, documentation, auth } = this.props
    const { pathname } = history.location
    const { selectedMenu, selectedSubmenu, isOutsideDetailHeader } = this.state
    const isApiDetail = pathname.startsWith('/api-detail/')
    const isTerms = pathname === '/terms'
    const isDataPrivacy = pathname.endsWith('/privacy')
    const isCodes = pathname.endsWith('/recovery-codes')
    const isActivityLog = pathname === '/activity-log'
    const splitPathname = pathname.split('/')
    const isAppDetail = splitPathname.length === 3 && splitPathname[1] === 'apps'
    const isTestDataDetail = splitPathname.length === 3 && splitPathname[1] === 'testdata'
    const isTestDataTransactionHistory = splitPathname.length === 5 && splitPathname[1] === 'testdata' && splitPathname[3] === 'transactions'
    const unprotectedItems = selectedMenu.submenu.filter(submenu => !submenu.protected)
    const hasVisibleItems = unprotectedItems.length > 0 || isLoggedIn || isApiDetail || isTerms || isDataPrivacy
    const isAdmin = auth.user.roles && !!auth.user.roles.find(r => r.role === 'ADMIN' && r.organizationId === auth.user.organizations[0].id)

    // Documentation specific
    const isDocumentation = pathname.includes('/docs', '/docs/started')
    const isScenarios = pathname === '/scenarios'
    const isScenariosManual = pathname === '/scenarios/manual'
    const showBackDocsButton = isDocumentation ? documentation.topic !== null : false

    return (
      <div
        className={classnames(
          'menu app-bar-submenu',
          { 'logged-in': isLoggedIn },
          { 'transparent-submenu': isApiDetail && !isOutsideDetailHeader },
          { 'grey-submenu': (isApiDetail && isOutsideDetailHeader) || isActivityLog },
          { hidden: !hasVisibleItems || (selectedSubmenu && selectedSubmenu.hide) || auth.isBlocked }
        )}
      >
        <div className='submenu-wrapper'>
          {isApiDetail &&
            <div className='back-navigation' testid='api-detail-back-btn' onClick={history.goBack}>
              <img src={caretLeftIcon} />
              <FormattedMessage id='landing.apiDetail.navigation' />
            </div>}
          {(showBackDocsButton || isScenarios) &&
            <div
              className='back-navigation'
              testid='docs-back-btn'
              onClick={() => {
                history.push('/docs')
                this.props.changeTopic(null, null)
              }}
            >
              <img src={caretLeftIcon} />
              <FormattedMessage id='navigation.docs.backtooverview' />
            </div>}
          {(isScenariosManual) &&
            <div
              className='back-navigation'
              testid='docs-back-btn'
              onClick={() => {
                history.push('/scenarios')
                this.props.changeTopic(null, null)
              }}
            >
              <img src={caretLeftIcon} />
              <FormattedMessage id='navigation.docs.backtoscenarios' />
            </div>}
          {(isTerms || isDataPrivacy) &&
            <div className='back-navigation' testid='terms-back-btn' onClick={history.goBack}>
              <img src={caretLeftIcon} />
              <FormattedMessage id='signup.navigation.back' />
            </div>}
          {(isAppDetail || isTestDataDetail || isTestDataTransactionHistory) &&
            <div className='back-navigation' testid='app-detail-back-btn' onClick={history.goBack}>
              <img src={caretLeftIcon} />
              <FormattedMessage id='navigation.apps.backtooverview' />
            </div>}
          {isCodes &&
            <div className='back-navigation' testid='codes-back-btn' onClick={history.goBack}>
              <img src={caretLeftIcon} />
              {isLoggedIn && <FormattedMessage id='back.security' />}
              {!isLoggedIn && <FormattedMessage id='back.signup' />}
            </div>}
          {!this.hideSubmenuItems() && selectedMenu.submenu.map((submenu, index) =>
            submenu.icon
              ? (
                <Tooltip content={submenu.tooltip} key={index} isLoggedIn={isLoggedIn}>
                  <IconButton
                    id={`${submenu.name}-submenu`}
                    testid={`${submenu.tag || submenu.name}-submenu`}
                    key={submenu.name}
                    onClick={this.handleSubmenuClick(submenu)}
                    className={classnames({
                      selected: selectedSubmenu && selectedSubmenu.name === submenu.name,
                      hidden: (submenu.protected && !isLoggedIn) || submenu.hidden,
                      disabled: submenu.disabled,
                    })}
                    disabled={submenu.disabled}
                  >
                    <img src={submenu.icon} />
                  </IconButton>
                </Tooltip>
              )
              : (
                <Button
                  id={`${submenu.name}-submenu`}
                  testid={`${submenu.name}-submenu`}
                  key={submenu.name}
                  className={classnames({
                    selected: selectedSubmenu && selectedSubmenu.name === submenu.name,
                    hidden: (submenu.protected && !isLoggedIn) || submenu.hidden,
                    disabled: submenu.disabled || (submenu.name === 'team' && !isAdmin),
                  })}
                  onClick={this.handleSubmenuClick(submenu)}
                  disabled={submenu.disabled || (submenu.name === 'team' && !isAdmin)}
                >
                  <FormattedMessage id={submenu.intlId} />
                </Button>
              ))}
        </div>
      </div>
    )
  }

  renderSideMenu = () => {
    const { isLoggedIn, history, isUserActivated, theme, auth } = this.props
    const { user } = auth
    const { pathname } = history.location
    const { isTop } = this.state
    const hasTransparentBG = !theme.staticNavigation && ['/', '/dashboard', '/recovery'].includes(pathname)
    const menuOptions = appBarMenu.slice(0, -1)

    return (
      <div
        className={classnames(
          { 'logged-in': isLoggedIn }
        )}
      >
        <List>
          {
            [
              menuOptions.map(menu =>
                this.displayMenuItem(menu) &&
              [
                <ListItem
                  button
                  key={menu.name}
                >
                  <ListItemText
                    disableTypography
                    primary={<Typography variant='button'><FormattedMessage id={menu.intlId} /></Typography>}
                    onClick={this.handleMenuClick(menu)}
                    style={menu.disabled ? { opacity: '.5' } : { textColor: 'blue' }}
                    disabled={menu.disabled}
                  >
                    {menu.submenu && hasTransparentBG && isLoggedIn && isTop && <KeyboardArrowDownIcon className='caret-icon' />}
                  </ListItemText>

                </ListItem>,
                <Divider key={`divider-${menu.name}`} />,
              ]
              ),
              <ListItem key='user-avatar'>
                {
                  isLoggedIn && isUserActivated &&
                  (user.avatar ? (
                    <div
                      key='user-avatar'
                      testid='user-avatar-btn'
                      className='user-avatar'
                      style={{ backgroundImage: `url('${user.avatar}')` }}
                      onClick={this.handleUserClick}
                    />
                  ) : (
                    <img
                      src={avatarDefaultIcon}
                      className='user-avatar'
                      testid='user-avatar-btn'
                      onClick={this.handleUserClick}
                    />
                  ))
                }
              </ListItem>,
            ]
          }
        </List>
      </div>
    )
  }

  render () {
    const { isTop, selectedMenu } = this.state
    const { isLoggedIn, history, isUserActivated, auth, theme } = this.props
    const { user } = auth
    const hasTransparentBG = !theme.staticNavigation && ['/', '/dashboard', '/recovery'].includes(history.location.pathname)
    const isLandingPage = history.location.pathname === '/'

    return (
      <div className={classnames(
        'navigation',
        { 'is-opaque': (hasTransparentBG && !isTop) || !hasTransparentBG || (hasTransparentBG && auth.isBlocked && !isLandingPage) }
      )}
      >
        <div className='app-bar'>
          <div className='app-bar-wrapper'>
            <div className='app-bar-header'>
              <Button className='selected' id='nav-button' onClick={this.toggleDrawer('drawer', true)}><MenuIcon /></Button>
              <div className='left-container' onClick={this.handleLogoClick}>
                <img className='app-logo' src={theme.logo} />
                {theme.name === 'default' ? <div className='app-title'><strong>{theme.bank}</strong>OPENBANK</div> : <Typography className='app-title'><FormattedMessage id='navigation.title' /></Typography>}
              </div>
            </div>
            <div className={classnames('user-details', { selected: selectedMenu.name === userMenu.name })}>
              {isLoggedIn && isUserActivated &&
                (user.avatar ? (
                  <div
                    key='user-avatar'
                    testid='user-avatar-btn'
                    className='user-avatar'
                    style={{ backgroundImage: `url('${user.avatar}')` }}
                    onClick={this.handleUserClick}
                  />
                ) : (
                  <img
                    src={avatarDefaultIcon}
                    className='user-avatar'
                    testid='user-avatar-btn'
                    onClick={this.handleUserClick}
                  />
                ))}
            </div>
            {this.renderMenu()}
          </div>
          {selectedMenu.submenu && this.renderSubmenu()}
        </div>

        <SwipeableDrawer
          open={this.state.drawer}
          onClose={this.toggleDrawer('drawer', false)}
          onOpen={this.toggleDrawer('drawer', true)}
        >
          <div
            className='sidemenu'
            tabIndex={0}
            role='button'
            onClick={this.toggleDrawer('drawer', false)}
            onKeyDown={this.toggleDrawer('drawer', false)}
          >
            <div onClick={this.handleLogoClick}>
              <img className='app-logo' src={theme.logo} />
              {theme.name === 'default' ? <div className='sidemenu-app-title'><strong>{theme.bank}</strong>OPENBANK</div> : <Typography className='sidemenu-app-title'><FormattedMessage id='navigation.title' /></Typography>}
            </div>
            {this.renderSideMenu()}
          </div>
        </SwipeableDrawer>
      </div>
    )
  }
}

Navigation.propTypes = {
  /**
   * If the user is logged in
   */
  isLoggedIn: bool,
  /**
   * Logs out the current user
   */
  logout: func.isRequired,
  /**
   * Browser history session
   */
  history: object.isRequired,
  /**
   * The navigation state
   */
  location: object.isRequired,
  /**
   * Opens the Login Modal
   */
  openLoginModal: func.isRequired,
  /**
   * tells root view if there is an expanded menu or not
   */
  checkExpanded: func.isRequired,
  /**
   * Documentation state for information on navigation
   */
  documentation: object.isRequired,
  /**
   * Changes documentation topic
   */
  changeTopic: func.isRequired,
  /**
   * Opens the Support Modal
   */
  openSupportModal: func.isRequired,
  /**
   * If the user is activated and can access all the content
   */
  isUserActivated: bool,
  /**
   * Application theme
   */
  theme: object.isRequired,
  /**
   * User Authentication state
   */
  auth: object.isRequired,
}

export default Navigation
