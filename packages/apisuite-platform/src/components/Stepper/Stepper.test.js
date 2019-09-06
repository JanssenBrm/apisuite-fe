import React from 'react'
import { shallow } from 'enzyme'
import Stepper, { pickHex } from './Stepper'

const steps = [
  { name: 'Step 1' },
  { name: 'Step 2' },
  { name: 'Step 3' }
]

const colors = {
  tealColor: '#2DB7BA',
  lightGreen: '#14DE2D'
}

describe('<Stepper />', () => {
  const wrapper = shallow(<Stepper steps={steps} currentStep={1} colors={colors} />)

  // Test picHex functions
  it('pickHex should return a color if no percentage is given', () => {
    expect(pickHex(colors.tealColor, colors.lightGreen)).toEqual(colors.lightGreen)
  })

  it('pickHex should return a middle color', () => {
    expect(pickHex(colors.tealColor, colors.lightGreen, 0.5)).toEqual('#14DE2D')
  })

  it('should render the correct number of steps', () => {
    expect(wrapper.find('.step')).toHaveLength(steps.length)
  })

  it('should have the correct initial step', () => {
    expect(wrapper.find('.step').first().hasClass('current'))
    expect(wrapper.find('.step').first().hasClass('active')).toEqual(false)
    expect(wrapper.find('.step').first().hasClass('not-active')).toEqual(false)
    expect(wrapper.find('.step').first().find('.step-name').text()).toEqual(steps[0].name)
  })

  const wrapperNext = shallow(<Stepper steps={steps} currentStep={2} colors={colors} />)

  it('should update the step', () => {
    expect(wrapperNext.find('.step').first().hasClass('current')).toEqual(false)
    expect(wrapperNext.find('.step').first().hasClass('active')).toEqual(true)
    expect(wrapperNext.find('.step').first().hasClass('not-active')).toEqual(false)
    expect(wrapperNext.find('.step').at(1).hasClass('current')).toEqual(true)
  })
})
