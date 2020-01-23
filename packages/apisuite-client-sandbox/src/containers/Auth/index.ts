import { RequireAuth } from './RequireAuth'
import { Store } from 'store/types'
import { connect } from 'react-redux'
// import { RequireAuthStateProps, RequireAuthOwnProps } from './types'

const mapStateToProps = ({ auth }: Store) => ({
  user: auth.user,
})

export default connect(mapStateToProps, null)(RequireAuth)
