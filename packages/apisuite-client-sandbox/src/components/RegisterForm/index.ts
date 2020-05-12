import { connect } from 'react-redux'
import { registerActions } from './ducks'
import RegisterForm from './RegisterForm'
import { UserData } from './types'
import { Dispatch } from 'redux'
import { Store } from 'store/types'

const mapDispatchToProps = (dispatch: Dispatch) => ({
  registerUser: (userData: UserData) => dispatch(registerActions.registerUser(userData)),
})

const mapStateToProps = ({ register }: Store) => ({
  register: register,
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
