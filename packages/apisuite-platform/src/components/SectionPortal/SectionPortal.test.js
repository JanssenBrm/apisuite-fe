
import React from 'react'
import { shallow } from 'enzyme'
import SectionPortal from 'components/SectionPortal'
import Card from 'components/Card'

describe('<SectionPortal />', () => {
  const props = {
    navigate: jest.fn(),
    isLoggedIn: false
  }
  const wrapper = shallow(<SectionPortal {...props} />)

  it('should have div as parent', () => {
    expect(wrapper.find('.portal-section')).toHaveLength(1)
  })

  it('should find Card in the content', () => {
    expect(wrapper.find(Card)).toHaveLength(1)
  })

  it('should go to signup on button click', () => {
    wrapper.find('#signup').simulate('click')
    expect(props.navigate).toHaveBeenCalledWith('signup')
  })
})
