
import React from 'react'
import { shallow } from 'enzyme'
import ListItem from '@material-ui/core/ListItem'
import Privacy from './Privacy'
import DataPrivacy from './Topics/DataPrivacy'

describe('<Privacy />', () => {
  const wrapper = shallow(<Privacy />)
  const handleClickSpy = jest.spyOn(wrapper.instance(), 'handleClick')

  it('should have div as parent', () => {
    expect(wrapper.find('.privacy-container')).toHaveLength(1)
  })

  it('should call handleClickSpy on click on a menu item', () => {
    expect(handleClickSpy).not.toHaveBeenCalled()
    expect(wrapper.find(ListItem).first().props().children.props.primary).toEqual('1. Which personal data do we use about you?')
    wrapper.find(ListItem).first().simulate('click')
    expect(handleClickSpy).toHaveBeenCalled()
  })
})

describe('<DataPrivacy />', () => {
  const wrapper = shallow(<DataPrivacy />)
  it('should have privacy content', () => {
    expect(wrapper.find('.topic-container')).toHaveLength(1)
  })
})
