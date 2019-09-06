
import React from 'react'
import { shallow } from 'enzyme'
import ModalSplit from 'components/ModalSplit'
import Modal from '@material-ui/core/Modal'

describe('<ModalSplit />', () => {
  const open = false
  const component = <div />
  const wrapper = shallow(<ModalSplit open={open} component={component} />)

  it('should have Modal as parent', () => {
    expect(wrapper.find(Modal)).toHaveLength(1)
  })

  it('should prevent from closing the modal without controlled actions', () => {
    expect(wrapper.props().disableBackdropClick).toEqual(true)
    expect(wrapper.props().disableEscapeKeyDown).toEqual(true)
  })
})
