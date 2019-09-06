
import React from 'react'
import { shallow } from 'enzyme'
import AppCard from 'components/AppCard'
import IconButton from '@material-ui/core/IconButton'

const mockApp = {
  'id': 1,
  'name': 'My First App',
  'description': 'Very cool app',
  'icon': 'http://myicon',
  'permissions': [{ 'id': 1 }],
  'publicURL': 'public.com',
  'redirectURL': ['redirect.com'],
  'created': '2018-04-19T12:00:00.000Z',
  'updated': '2018-04-19T12:00:00.000Z'
}

const props = {
  app: mockApp,
  history: { push: jest.fn() }
}

describe('<AppCard />', () => {
  const wrapper = shallow(<AppCard {...props} />)

  it('should have div as parent', () => {
    expect(wrapper.find('.app-card')).toHaveLength(1)
  })

  it('should display app name', () => {
    expect(wrapper.find('.app-card-name').first().props().children).toEqual(props.app.name)
  })

  it('should toggle menu dropdown', () => {
    wrapper.find(IconButton).first().simulate('click')
    expect(wrapper.state().open).toEqual(true)
  })

  it('should close menu dropdown', () => {
    wrapper.instance().handleClose()
    expect(wrapper.state().open).toEqual(false)

    wrapper.instance().handleButtonRef('ref')
    expect(wrapper.instance().anchorEl).toEqual('ref')
  })
})
