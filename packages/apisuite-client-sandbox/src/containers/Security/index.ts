import { Dispatch } from 'redux'

import { connect } from 'react-redux'

import { updatePasswordRequestAction } from './ducks'

import Security from './Security'

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updatePasswordRequest: (oldPassword: string, newPassword: string) => {
    dispatch(updatePasswordRequestAction(oldPassword, newPassword))
  },
})

export default connect(null, mapDispatchToProps)(Security)
