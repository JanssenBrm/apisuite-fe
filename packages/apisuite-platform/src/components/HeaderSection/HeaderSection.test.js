
import React from 'react'
import { mountWithIntl } from 'util/test-utils'
import HeaderSection from 'components/HeaderSection'
import Carousel from 'nuka-carousel'
import Button from '@material-ui/core/Button'
import themes from 'themes'

const props = {
  theme: themes.default
}

describe('<HeaderSection />', () => {
  const wrapper = mountWithIntl(<HeaderSection {...props} />)

  it('Should have the carousel', () => {
    expect(wrapper.find(Carousel)).toHaveLength(1)
  })

  it('Should have slider bullets', () => {
    expect(wrapper.find('.slider-bullet')).toHaveLength(3)
  })

  it('Should change slide button based on login status', () => {
    wrapper.setProps({ isLoggedIn: true })
    expect(wrapper.find(Button)).toHaveLength(2)
    expect(wrapper.find(Button).first().props().id).toEqual('readmore-btn')
  })
})
