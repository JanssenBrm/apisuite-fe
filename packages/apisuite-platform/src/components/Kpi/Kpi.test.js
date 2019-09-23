import React from 'react'
import { shallow } from 'enzyme'
import Kpi from './Kpi'

describe('<Kpi />', () => {
  const props = {
    title: 'My KPI',
    subtitle: 'All stats',
    value: '87',
  }
  const wrapper = shallow(<Kpi {...props} />)

  it('should render a div with class kpi-container', () => {
    expect(wrapper.hasClass('kpi-container')).toEqual(true)
    expect(wrapper.type()).toEqual('div')
  })

  it('should render title, subtitle and value', () => {
    expect(wrapper.find('.kpi-title')).toHaveLength(1)
    expect(wrapper.find('.kpi-subtitle')).toHaveLength(1)
    expect(wrapper.find('.kpi-share')).toHaveLength(1)
  })
})
