import { connect } from 'react-redux'
import { createApp } from '../ducks'
import CreateApp from './CreateApp'
import { Dispatch } from 'redux'

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createApp: () => dispatch(createApp()),
})

export default connect(null, mapDispatchToProps)(CreateApp)
