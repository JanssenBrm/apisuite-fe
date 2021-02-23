import { connect } from 'react-redux'
import APIDetails from './APIDetails'
import { Store } from 'store/types'
import {
  Dispatch,
  bindActionCreators,
} from 'redux'
import {
  getApiVersion,
} from './ducks'

export const mapStateToProps = ({ apiDetails }: Store) => ({
  apiDetails,
})

export const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  getApiVersion: getApiVersion,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(APIDetails)
