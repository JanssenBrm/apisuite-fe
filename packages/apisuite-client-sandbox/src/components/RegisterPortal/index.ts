import { connect } from 'react-redux'
import { registerUser } from './ducks'
import RegisterPortal from './RegisterPortal'
import { UserData } from './types'
import { Dispatch } from 'redux'
import { Store } from 'store/types'

const mapDispatchToProps = (dispatch: Dispatch) => ({
  registerUser: (userData: UserData) => dispatch(registerUser(userData)),
})

const mapStateToProps = ({ auth }: Store) => ({
  auth: auth,
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPortal)
