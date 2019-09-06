import { connect } from 'react-redux'
import RecoveryCodes from './RecoveryCodes'
import { injectIntl } from 'react-intl'
import withTheme from 'components/ThemeContext/withTheme'
import { cleanCodes } from './ducks'

const mapStateToProps = ({ recovery, auth, signup }) => ({ codes: recovery.codes, auth, signup })

const mapDispatchToProps = (dispatch) => ({
  cleanCodes: () => dispatch(cleanCodes())
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(
  withTheme(RecoveryCodes)
))
