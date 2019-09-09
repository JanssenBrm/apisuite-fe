import { connect } from 'react-redux'
import { getApiDocs } from 'containers/Api/ducks'
import Api from './Api'
import { injectIntl } from 'react-intl'

const mapStateToProps = ({ apidocs }) => ({ apidocs: apidocs.apidocs, ui: apidocs.ui })

const mapDispatchToProps = (dispatch) => ({
  getApiDocs: (brand, productId, role, version) => dispatch(getApiDocs(brand, productId, role, version)),
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Api))
