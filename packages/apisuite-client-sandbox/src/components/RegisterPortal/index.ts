import { connect } from 'react-redux'
import { registerUser } from './ducks'
import RegisterPortal from './RegisterPortal'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  registerUser: userData => dispatch(registerUser(userData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPortal)
