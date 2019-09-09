import React, { Component } from 'react'
import { object, array, func } from 'prop-types'
import FormField from 'components/FormField'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import MultiSelect from 'components/MultiSelect'
// import CircularProgress from '@material-ui/core/CircularProgress'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import knowledgeBaseIcon from 'assets/knowledge_base_grey.svg'
import apiReferenceIcon from 'assets/api_reference.svg'
import classnames from 'classnames'

class Scenarios extends Component {
  state = {
    scenario: {
      body: '',
      code: '',
      state: '',
      endpoints: [],
      scenario: '',
      scenarioId: '',
      title: '',
    },
    errors: [],
    apis: [],
    endpoints: [],
    scenarios: [],
    selectedApi: {
      api: '',
      versions: [],
    },
    selectedVersion: '',
    selectedEndpoints: [],
    endpointsExpanded: false,
    activeScenario: '',
    anchorEl: null,
  }

  componentDidMount () {
    this.props.fetchApis()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.scenario !== this.props.scenario) {
      this.setState({
        scenario:
          {
            ...nextProps.scenario,
            body: nextProps.scenario.body ? JSON.stringify(JSON.parse(nextProps.scenario.body), null, 3) : '',
            endpoints: nextProps.scenario.endpoints,
          },
      })
    }

    if (nextProps.endpoints.records !== this.props.endpoints.records) {
      this.setState({ endpoints: nextProps.endpoints.records })
    }

    if (nextProps.scenarios !== this.props.scenarios) {
      this.setState({
        scenarios: nextProps.scenarios,
      })
    }

    if (nextProps.apis && nextProps.apis.length && nextProps.apis !== this.props.apis) {
      this.setState({
        apis: nextProps.apis,
        selectedApi: {
          api: nextProps.apis[0].api,
          versions: nextProps.apis[0].versions,
        },
      })
    }

    if (nextProps.ui !== this.props.ui) {
      this.setState({
        ui: nextProps.ui,
      })
    }
  }

  navigate = route => event => {
    this.props.history.push(route)
  }

  handleApiChange = ({ target }, errors) => {
    const { apis } = this.props
    const apiIndex = apis.findIndex(a => a.api === target.value)
    const selectedApi = apiIndex === -1 ? target.value : apis[apiIndex]
    const selectedVersion = apiIndex === -1 ? target.value.versions[0] : apis[apiIndex].versions[0]

    this.setState({
      selectedApi,
      selectedVersion,
    })

    if (selectedApi.api && selectedVersion) {
      this.props.fetchEndpoints(selectedApi.api, selectedVersion)
    }
  }

  handleVersionChange = ({ target }, errors) => {
    if (target.value === this.state.selectedVersion) return

    const { selectedApi } = this.state
    const version = target.value

    this.setState({ [target.name]: version })

    if (selectedApi.api && version) {
      this.props.fetchEndpoints(selectedApi.api, version)
    }
  }

  handleCheckboxChange = item => event => {
    const { selectedEndpoints } = this.state
    this.setState({ selectedEndpoints: event.target.checked ? [...selectedEndpoints, item] : selectedEndpoints.filter(sub => sub.id !== item.id) })
  }

  handleExpand = (event, expanded) => {
    this.setState({ endpointsExpanded: expanded })
  }

  handleFilter = () => {
    const { selectedEndpoints } = this.state
    const endpointIds = selectedEndpoints.map(e => e.id)
    this.props.fetchScenarios(endpointIds)
  }

  handleScenarioDisplay = scenarioId => event => {
    this.setState({ activeScenario: scenarioId })
    this.props.getScenario(scenarioId)
  }

  render () {
    const { intl } = this.props
    const { selectedApi, selectedVersion, selectedEndpoints, scenario, apis, endpoints, scenarios, activeScenario } = this.state

    const idLabel = intl.formatMessage({ id: 'docs.scenarios.id.label' })
    const titleLabel = intl.formatMessage({ id: 'docs.scenarios.title.label' })
    const scenarioLabel = intl.formatMessage({ id: 'docs.scenarios.scenario.label' })
    const codeLabel = intl.formatMessage({ id: 'docs.scenarios.code.label' })
    const bodyLabel = intl.formatMessage({ id: 'docs.scenarios.body.label' })
    const filterLabel = intl.formatMessage({ id: 'docs.scenarios.filter' })

    return (
      <div className='scenarios-container'>
        <div className='scenarios-wrapper'>
          <div className='left-column'>
            <div className='form-wrapper'>
              <div className='filter-form'>
                <FormField
                  disabled={apis.length === 1}
                  id='scenario-endpoints-api'
                  testid='scenario-endpoints-api'
                  className='detail-formfield select'
                  name='selectedApi'
                  type='select'
                  displayKey='api'
                  fullWidth
                  label={filterLabel}
                  value={selectedApi ? selectedApi.api : ''}
                  data={apis}
                  onChange={this.handleApiChange}
                  inputlabelprops={{ shrink: true }}
                >
                  {apis.map((item, idx) => (
                    <MenuItem
                      id={`api-${idx}`}
                      key={idx}
                      value={item}
                    >
                      {item.api}
                    </MenuItem>
                  ))}
                </FormField>
                <FormField
                  disabled={selectedApi && (!selectedApi.versions || selectedApi.versions.length === 1)}
                  id='scenario-endpoints-version'
                  testid='scenario-endpoints-version'
                  className='detail-formfield select'
                  name='selectedVersion'
                  type='select'
                  value={selectedVersion}
                  data={selectedApi && selectedApi.versions}
                  onChange={this.handleVersionChange}
                >
                  {selectedApi && selectedApi.versions && selectedApi.versions.map((version, idx) => (
                    <MenuItem
                      key={idx}
                      value={version}
                    >
                      {version}
                    </MenuItem>
                  ))}
                </FormField>
                <MultiSelect
                  id='scenario-endpoints-methods'
                  testid='scenario-endpoints-methods'
                  name='endpoints'
                  displayKey='path'
                  options={endpoints}
                  selected={selectedEndpoints}
                  expanded
                  onChange={this.handleCheckboxChange}
                  onClick={this.handleExpand}
                />
                <Button
                  id='filter-button'
                  testid='filter-btn'
                  className={classnames('filter-button', { disabled: !selectedEndpoints.length })}
                  variant='outlined'
                  onClick={this.handleFilter}
                  disabled={!selectedEndpoints.length}
                >
                  <FormattedMessage id='docs.scenarios.filter' />
                </Button>
              </div>
            </div>
            <div className='scenarios-list'>
              {scenarios.length > 0 ? scenarios.map((s, idx) =>
                <div
                  key={`scenario-${idx}`}
                  className={classnames(
                    'scenario-row',
                    { active: activeScenario === s.scenarioId }
                  )}
                  onClick={this.handleScenarioDisplay(s.scenarioId)}
                >
                  <div className='scenario-row-content'>
                    <div className='scenario-code'>{s.code}</div>
                    <div className='scenario-name'>{s.scenario}</div>
                    <KeyboardArrowRightIcon className='right-caret' />
                  </div>
                </div>
              )
                : <div className='empty-list'>
                  <FormattedMessage id='docs.scenarios.empty' />
                </div>}
            </div>
            <div className='footer-actions'>
              <div className='action-wrapper' onClick={this.navigate('/scenarios/manual')}>
                <div className='action-button'>
                  <img className='action-icon' src={knowledgeBaseIcon} />
                  <FormattedMessage id='docs.scenarios.read' />
                </div>
              </div>
              <div className='action-wrapper' onClick={this.navigate('/api-references')}>
                <div className='action-button'>
                  <img className='action-icon' src={apiReferenceIcon} />
                  <FormattedMessage id='docs.scenarios.reference' />
                </div>
              </div>
            </div>
          </div>
          <div className='right-column'>
            <div className='detail-block'>
              <div className='detail-block-header'>
                <FormattedMessage id='docs.scenarios.documentation.header' />
              </div>
              <div className='detail-block-wrapper'>
                <FormField
                  readOnly
                  fullWidth
                  id='scenario-doc-id'
                  testid='scenario-doc-id'
                  className='detail-formfield'
                  name='scenarioId'
                  label={idLabel}
                  value={scenario.scenarioId}
                  onChange={this.handleChange}
                />
                <FormField
                  readOnly
                  fullWidth
                  id='scenario-doc-title'
                  testid='scenario-doc-title'
                  className='detail-formfield'
                  name='title'
                  label={titleLabel}
                  value={scenario.title}
                  onChange={this.handleChange}
                />
                <FormField
                  readOnly
                  fullWidth
                  id='scenario-doc-desc'
                  testid='scenario-doc-desc'
                  className='detail-formfield'
                  name='scenario'
                  label={scenarioLabel}
                  value={scenario.scenario}
                  multiline
                  rows={3}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className='detail-block'>
              <div className='detail-block-header'>
                <FormattedMessage id='docs.scenarios.response.header' />
              </div>
              <div className='detail-block-wrapper'>
                <FormField
                  readOnly
                  fullWidth
                  id='scenario-response-code'
                  testid='scenario-response-code'
                  className='detail-formfield'
                  inputtype='number'
                  name='code'
                  label={codeLabel}
                  value={scenario.code}
                  onChange={this.handleChange}
                />
                <FormField
                  readOnly
                  fullWidth
                  id='scenario-response-body'
                  testid='scenario-response-body'
                  className='detail-formfield'
                  name='body'
                  label={bodyLabel}
                  value={scenario.body}
                  multiline
                  rows={8}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Scenarios.defaultProps = {
}

Scenarios.propTypes = {
  intl: object.isRequired,
  history: object.isRequired,
  fetchApis: func.isRequired,
  fetchEndpoints: func.isRequired,
  fetchScenarios: func.isRequired,
  getScenario: func.isRequired,
  scenario: object.isRequired,
  ui: object.isRequired,
  endpoints: object.isRequired,
  scenarios: array.isRequired,
  apis: array.isRequired,
}

export default Scenarios
