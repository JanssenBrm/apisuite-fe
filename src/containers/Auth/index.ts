import { RequireAuth } from './RequireAuth'
import { Store } from 'store/types'
import { connect } from 'react-redux'

const mapStateToProps = ({ auth }: Store) => ({
  auth: auth,
})

export default connect(mapStateToProps, null)(RequireAuth)
