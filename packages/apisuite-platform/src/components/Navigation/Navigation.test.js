
import React from 'react'
import { shallowWithIntl } from 'util/test-utils'
import themes from 'themes'
import Navigation from './Navigation'
import consoleIcon from 'assets/console_icon.svg'
import powerSettingsIcon from 'assets/power_settings.svg'

const mockMenu = [
  {
    name: 'api-products',
    intlId: 'navigation.apiProducts',
    submenu: [
      { name: 'overview', intlId: 'navigation.overview', route: '/' },
      { name: 'upcoming', intlId: 'navigation.upcoming', route: '/api/upcoming', disabled: true },
      { name: 'feedback', intlId: 'navigation.feedback', route: '/api/feedback', disabled: true },
      { name: 'subscriptions', intlId: 'navigation.subscriptions', route: '/api/subscriptions' }
    ]
  },
  {
    name: 'documentation',
    intlId: 'navigation.docs',
    submenu: [
      { name: 'overview', intlId: 'navigation.overview', route: '/api', disabled: true },
      { name: 'apps', intlId: 'navigation.apps', route: '/api', protected: true }
    ]
  },
  {
    name: 'support',
    intlId: 'navigation.support',
    route: '/support'
  },
  {
    name: 'dashboard',
    intlId: 'navigation.manageApps',
    submenu: [
      { name: 'overview', intlId: 'navigation.overview', route: '/dashboard' },
      { name: 'apps', intlId: 'navigation.apps', route: '/apps', disabled: true },
      { name: 'testData', intlId: 'navigation.testData', route: '/testdata', disabled: true },
      { name: 'analytics', intlId: 'navigation.analytics', route: '/analytics', disabled: true },
      { name: 'users', intlId: 'navigation.users', route: '/users', disabled: true },
      { name: 'console', route: '/api/console', icon: consoleIcon, disabled: true }
    ]
  },
  {
    name: 'user',
    submenu: [
      { name: 'profile', intlId: 'navigation.profile', route: '/profile' },
      { name: 'security', intlId: 'navigation.security', route: '/profile' },
      { name: 'team', intlId: 'navigation.team', route: '/team' },
      { name: 'codes', intlId: 'navigation.codes', route: '/recovery-codes', hidden: true },
      { name: 'organisation', intlId: 'navigation.organisation', route: '/organisation' },
      { name: 'logout', route: '/logout', icon: powerSettingsIcon, tooltip: 'Logout' }
    ]
  }
]

const mockUserMenu = mockMenu[mockMenu.length - 1]
const mockOrganizations = [{ id: 1, name: 'myOrg', state: 'NON_TRUSTED' }]

const props = {
  history: { push: jest.fn(), location: { pathname: '/' } },
  location: { pathname: '/' },
  documentation: { topic: null },
  logout: jest.fn(),
  isLoggedIn: true,
  auth: {
    isBlocked: false,
    user: {
      id: 123,
      fullName: 'Clau',
      avatar: 'myAvatar',
      email: 'clau@cloudoki.com',
      organizations: mockOrganizations
    }
  },
  openLoginModal: jest.fn(),
  checkExpanded: jest.fn(),
  openSupportModal: jest.fn(),
  changeTopic: jest.fn(),
  isUserActivated: true,
  theme: themes.default
}

describe('<Navigation />', () => {
  const wrapper = shallowWithIntl(<Navigation {...props} />)

  it('should be a div with a class for the container', () => {
    expect(wrapper.hasClass('navigation')).toEqual(true)
    expect(wrapper.type()).toEqual('div')
  })

  it('should call handleScroll on scroll', () => {
    wrapper.setState({ isTop: false })
    const scrollSpy = jest.spyOn(wrapper.instance(), 'handleScroll')
    wrapper.find('.navigation').first().simulate('scroll', { deltaY: 50 })
    wrapper.instance().handleScroll({type: 'scroll'})
    expect(scrollSpy).toHaveBeenCalled()

    const isTop = global.window.scrollY < 50
    expect(wrapper.state().isTop).toEqual(isTop)
  })

  it('should call handleMenuClick on menu item click', () => {
    wrapper.find('#documentation-menu').first().simulate('click')
    expect(wrapper.state().selectedMenu.name).toEqual(mockMenu[1].name)

    wrapper.find('#api-products-menu').first().simulate('click')
    expect(wrapper.state().selectedMenu.name).toEqual(mockMenu[0].name)
  })

  it('should call handleSubmenuClick on submenu item click', () => {
    wrapper.find('#overview-submenu').first().simulate('click')
    expect(wrapper.state().selectedSubmenu.name).toEqual(mockMenu[0].submenu[0].name)
  })

  it('should redirect to API Products on Logo click', () => {
    wrapper.find('.left-container').first().simulate('click')
    expect(props.history.push).toHaveBeenCalledWith('/')
  })

  it('should go back on navigation click', () => {
    wrapper.setProps({ history: {...props.history, location: {pathname: '/api-detail/api'}} })
    wrapper.find('.back-navigation').first().simulate('click')
    expect(props.history.push).toHaveBeenCalledWith('/')
  })

  it('should open profile settings on avatar click', () => {
    wrapper.find('.user-avatar').first().simulate('click')
    expect(wrapper.state().selectedMenu).toEqual(mockUserMenu)
  })

  it('should navigate to security settings', () => {
    wrapper.find('#security-submenu').first().simulate('click')
    expect(wrapper.state().selectedSubmenu).toEqual(mockUserMenu.submenu[1])
  })

  it('should call logout from user menu', () => {
    wrapper.find('#logout-submenu').first().simulate('click')
    expect(props.logout).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should call navigate on signup click', () => {
    wrapper.setProps({ isLoggedIn: false })
    wrapper.find('#signup-menu').first().simulate('click')
    expect(props.history.push).toHaveBeenCalledWith('/signup')
  })
})
