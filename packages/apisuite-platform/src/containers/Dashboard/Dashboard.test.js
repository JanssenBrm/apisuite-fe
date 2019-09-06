import React from 'react'
import { shallow } from 'enzyme'
import Dashboard from './Dashboard'
import Overview from './Overview'
import FirstUse from './FirstUse'

const mockApps = [
  {
    'id': 1,
    'name': 'My First App',
    'description': 'Very cool app',
    'icon': 'http://myicon',
    'publicURL': 'public.com',
    'redirectURLs': ['redirect.com']
  }
]

const props = {
  history: {
    push: jest.fn()
  },
  user: { fullName: 'Mh Mai', organizations: [{ id: 1, name: 'myOrg' }] },
  fullName: 'Mh Mai',
  openSupportModal: jest.fn(),
  fetchApps: jest.fn(),
  apps: mockApps,
  theme: {},
  fetchLatestNotification: jest.fn(),
  notification: {},
  showNotification: false
}

describe('<Dashboard />', () => {
  const wrapper = shallow(<Dashboard {...props} />)

  it('should render a div with class dashboard', () => {
    expect(wrapper.hasClass('dashboard')).toEqual(true)
    expect(wrapper.type()).toEqual('div')
  })

  it('should render Overview navigation section', () => {
    expect(wrapper.find(Overview).length).toEqual(1)
  })
})

describe('<Overview />', () => {
  const wrapper = shallow(<Overview {...props} />)
  const navigateSpy = jest.spyOn(wrapper.instance(), 'navigate')

  it('should render 6 nav-items in the navigation section', () => {
    expect(wrapper.find('.nav-item').length).toEqual(6)
  })

  it('should call navigate function on nav item click', () => {
    expect(navigateSpy).not.toHaveBeenCalled()
    wrapper.find('.nav-item').first().simulate('click')
    expect(navigateSpy).toHaveBeenCalled()
  })

  it('should open support modal', () => {
    wrapper.find('#proposeFeature').first().simulate('click')
    expect(props.openSupportModal).toHaveBeenCalled()
  })
})

describe('<FirstUse />', () => {
  const props = {
    history: { push: jest.fn() },
    apps: mockApps
  }
  const wrapper = shallow(<FirstUse {...props} />)

  it('should render 3 task steps', () => {
    expect(wrapper.find('.task-container').length).toEqual(3)
  })

  it('should apply different style to active task', () => {
    expect(wrapper.find('.task-step').first().hasClass('locked')).toEqual(true)
    expect(wrapper.find('.task-step').at(1).hasClass('locked')).toEqual(false)
    expect(wrapper.find('.task-step').at(1).find('.task-button').length).toEqual(1)
    expect(wrapper.find('.task-step').last().hasClass('locked')).toEqual(true)
  })

  it('should call navigate function step button click', () => {
    wrapper.setProps({ apps: [] })
    wrapper.find('.task-button').first().simulate('click')
    expect(props.history.push).toHaveBeenCalledWith('/apps')
  })
})
