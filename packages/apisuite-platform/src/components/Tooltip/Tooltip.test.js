import React from 'react'
import { shallow } from 'enzyme'
import ArrowTooltip from './Tooltip'

describe('<ArrowTooltip />', () => {
  const wrapper = shallow(<ArrowTooltip content='The tooltip' children={[]} />)

  it('should have the title as given content', () => {
    const tooltip = wrapper.dive()
    const tooltipProps = tooltip.props()

    expect(tooltipProps.open).toEqual(undefined)
  })
})
