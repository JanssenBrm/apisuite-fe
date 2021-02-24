import { connect } from 'react-redux'
import { nextStepAction } from 'components/RegisterForm/ducks'
import RegisterConfirmation from './RegisterConfirmation'
import {
  Dispatch,
  bindActionCreators,
} from 'redux'

export const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  nextStep: nextStepAction,
}, dispatch)

export default connect(null, mapDispatchToProps)(RegisterConfirmation)
