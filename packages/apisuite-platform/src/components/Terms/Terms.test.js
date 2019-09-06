
import React from 'react'
import { shallow } from 'enzyme'
import ListItem from '@material-ui/core/ListItem'
import Terms from './Terms'
import TermsAndConditions from './Topics/TermsAndConditions'

describe('<Terms />', () => {
  const wrapper = shallow(<Terms />)
  const handleClickSpy = jest.spyOn(wrapper.instance(), 'handleClick')

  it('should have div as parent', () => {
    expect(wrapper.find('.terms-container')).toHaveLength(1)
  })

  it('should call handleClickSpy on click on a menu item', () => {
    expect(handleClickSpy).not.toHaveBeenCalled()
    expect(wrapper.find(ListItem).first().props().children.props.primary).toEqual('Introduction')
    wrapper.find(ListItem).first().simulate('click')
    expect(handleClickSpy).toHaveBeenCalled()
  })
})

describe('<TermsAndConditions />', () => {
  const wrapper = shallow(<TermsAndConditions />)
  it('should have terms content', () => {
    expect(wrapper.find('.topic-container')).toHaveLength(1)
  })
})
