import { connect } from 'react-redux'
import SectionSubscribe from '../../components/SectionSubscribe'
import { sendNewsletterForm } from './ducks'
import { injectIntl } from 'react-intl'

const mapStateToProps = (state) => ({
  newsletter: state.newsletter,
})

const mapDispatchToProps = (dispatch) => ({
  sendNewsletterForm: form => dispatch(sendNewsletterForm(form)),
})
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(SectionSubscribe))
