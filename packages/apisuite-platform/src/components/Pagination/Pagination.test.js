import React from 'react'
import { shallow } from 'enzyme'
import Pagination from 'components/Pagination'

describe('<Pagination />', () => {
  const mockItems = Array.from(Array(11).keys()).map(i => ({ id: i + 1 }))

  const props = {
    items: mockItems,
    pager: {
      page: 1,
      rowCount: 11,
      pageCount: 2,
    },
    onChangePage: jest.fn(),
  }

  const wrapper = shallow(<Pagination {...props} />)

  it('should be a div with a class for the container', () => {
    expect(wrapper.hasClass('pagination')).toEqual(true)
    expect(wrapper.type()).toEqual('div')
  })

  it('should render 3 buttons', () => {
    expect(wrapper.find('.pagination-btn')).toHaveLength(4)
    expect(wrapper.find('.pagination-btn').first().hasClass('disabled')).toEqual(true)
    expect(wrapper.find('.pagination-btn').last().hasClass('disabled')).not.toEqual(true)
  })

  it('should navigate to next page', () => {
    wrapper.find('.pagination-btn').last().simulate('click')
    expect(props.onChangePage).toHaveBeenCalledWith(props.pager.page + 1, undefined)
  })

  it('should not render pagination if pageCount is 1', () => {
    wrapper.setProps({ items: [{ id: 1 }], pager: { ...props.pager, pageCount: 1, rowCount: 1 } })
    expect(wrapper.hasClass('pagination')).toEqual(false)
  })
})
