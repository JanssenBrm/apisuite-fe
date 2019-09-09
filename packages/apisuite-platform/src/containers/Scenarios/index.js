import { connect } from 'react-redux'
import Scenarios from './Scenarios'
import {
  fetchApis,
  fetchEndpoints,
  fetchScenarios,
  getScenario,
} from './ducks'
import { injectIntl } from 'react-intl'

const mapStateToProps = ({ scenarios }) => ({
  scenarios: scenarios.data,
  scenario: scenarios.scenario,
  ui: scenarios.ui,
  endpoints: scenarios.endpoints,
  apis: scenarios.apis,
})

const mapDispatchToProps = (dispatch) => ({
  fetchApis: () => dispatch(fetchApis()),
  fetchEndpoints: (apiName, version) => dispatch(fetchEndpoints(apiName, version)),
  fetchScenarios: (endpoints) => dispatch(fetchScenarios(endpoints)),
  getScenario: (id) => dispatch(getScenario(id)),
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Scenarios))
