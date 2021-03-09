import { connect } from 'react-redux'
import Login from './Login'
import { Store } from 'store/types'

const mapStateToProps = ({ register }: Store) => ({
  register: register,
})

export default connect(mapStateToProps, null)(Login)
