import { connect } from 'react-redux'
import ExternalResources from './ExternalResources'
import { fetchResources } from './ducks'
import { injectIntl } from 'react-intl'

const mapStateToProps = ({ resources }) => ({ resources: resources.data })
const mapDispatchToProps = (dispatch) => ({
  fetchResources: (page, pageSize) => dispatch(fetchResources(page, pageSize))
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ExternalResources))
