import { connect } from 'react-redux'
import Support from './Support'
import { sendSupportForm } from './ducks'
import { injectIntl } from 'react-intl'

const mapStateToProps = ({ support, auth }) => ({ ...support, auth })

const mapDispatchToProps = (dispatch) => ({
  sendSupportForm: form => dispatch(sendSupportForm(form)),
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Support))
