import { connect } from 'react-redux'
import Profile from './Profile'
import { Store } from 'store/types'

const mapStateToProps = ({ auth }: Store) => ({
  user: auth.user,
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
