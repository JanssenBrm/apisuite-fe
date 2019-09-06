
import React from 'react'
import { shallow } from 'enzyme'
import SvgIcon, { iconPaths } from 'components/SvgIcon'

describe('<SvgIcon />', () => {
  const iconName = 'menu'
  const color = 'red'
  const spy = jest.fn()
  const wrapper = shallow(<SvgIcon name={iconName} />)

  it('should be an svg', () => {
    expect(wrapper.type()).toEqual('svg')
  })

  it('should paths should be in `iconPaths.js`', () => {
    const wrapperPath = wrapper.find('path').props().d
    expect(wrapperPath).toEqual(iconPaths[iconName])
  })

  it('should implement a size prop so width and height are equal', () => {
    const width = wrapper.props().width
    const height = wrapper.props().height

    expect(width).toEqual(height)
  })

  it('should apply color to fill and its default is white', () => {
    let fill = wrapper.props().fill

    expect(fill).toEqual('#fff')

    wrapper.setProps({ color })
    fill = wrapper.props().fill

    expect(fill).toEqual(color)
  })

  it('should let pass any other unspecified prop i.e: stroke, onClick', () => {
    let stroke = wrapper.props().stroke

    wrapper.setProps({ stroke: color })
    stroke = wrapper.props().stroke

    expect(stroke).toEqual(color)

    wrapper.setProps({ onClick: spy })
    expect(spy).not.toHaveBeenCalled()

    wrapper.simulate('click')
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
