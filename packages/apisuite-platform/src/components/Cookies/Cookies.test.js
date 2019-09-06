
import React from 'react'
import { shallow } from 'enzyme'
import ListItem from '@material-ui/core/ListItem'
import Cookies from './Cookies'
import DataCookies from './Topics/DataCookies'

describe('<Cookies />', () => {
  const wrapper = shallow(<Cookies />)
  const handleClickSpy = jest.spyOn(wrapper.instance(), 'handleClick')

  it('should have div as parent', () => {
    expect(wrapper.find('.cookies-container')).toHaveLength(1)
  })

  it('should call handleClickSpy on click on a menu item', () => {
    expect(handleClickSpy).not.toHaveBeenCalled()
    expect(wrapper.find(ListItem).first().props().children.props.primary).toEqual('Introduction')
    wrapper.find(ListItem).first().simulate('click')
    expect(handleClickSpy).toHaveBeenCalled()
  })
})

describe('<DataCookies />', () => {
  const wrapper = shallow(<DataCookies />)
  it('should have cookies content', () => {
    expect(wrapper.find('.topic-container')).toHaveLength(1)
  })
})
