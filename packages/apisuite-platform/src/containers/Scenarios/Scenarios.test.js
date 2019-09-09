import React from 'react'
import { mountWithIntl } from 'util/test-utils'
import request from 'util/request'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import Scenarios from './Scenarios'
import reducer, {
  fetchApis,
  fetchApisSuccess,
  fetchApisError,
  fetchEndpoints,
  fetchEndpointsSuccess,
  fetchEndpointsError,
  fetchScenarios,
  fetchScenariosSuccess,
  fetchScenariosError,
  getScenario,
  getScenarioSuccess,
  getScenarioError,
} from './ducks'
import rootSaga from './sagas'
import Select from '@material-ui/core/Select'

const mockApis = [
  {
    api: 'test',
    versions: ['1.4.0.47', '2.2.1'],
  },
  {
    api: 'PSD2 ASPSP services for AISP, PISP and PIISP.',
    versions: ['1.4.0.47', '2.4'],
  },
]

const mockScenarios = [
  {
    id: 1,
    scenarioId: 'ba4917d8-9ebb-40c5-adf9-1cd91ed77793',
    title: 'accountsOk',
    scenario: 'Returns 200 OK and a list of accounts',
    code: 200,
    body: '{}',
    state: 'PUBLISHED',
    endpoints: [],
    createdAt: null,
    updatedAt: '2019-03-18T17:00:18.000Z',
  },
  {
    id: 2,
    scenarioId: '9ba9d2de-f267-4f3e-ba06-6dbff6831f3e',
    title: 'accounts401',
    scenario: 'Returns 401 Unauthorized',
    code: 401,
    body: '{}',
    state: 'PUBLISHED',
    endpoints: [],
    createdAt: null,
    updatedAt: '2019-03-20T12:13:51.000Z',
  },
]
const mockScenario = mockScenarios[0]
const mockEndpoints = {
  pagination: {
    page: 1,
    pageCount: 1,
    pageSize: 20,
    rowCount: 1,
  },
  records: [
    {
      id: 1,
      api: 'test',
      method: 'GET',
      path: '/v1/accounts',
      parameters: '',
      security: '',
      scenarios: [mockScenarios],
    },
  ],
}
const errorMock = { message: 'error-load-mock' }

describe('<Scenarios />', () => {
  const props = {
    intl: {},
    history: { push: jest.fn() },
    fetchScenarios: jest.fn(),
    fetchEndpoints: jest.fn(),
    fetchApis: jest.fn(),
    getScenario: jest.fn(),
    ui: {
      loading: false,
    },
    endpoints: {},
    apis: [],
    scenario: {},
    scenarios: [],
  }

  const wrapper = mountWithIntl(<Scenarios {...props} />)

  it('should render 2 columns', () => {
    expect(wrapper.find('.left-column')).toHaveLength(1)
    expect(wrapper.find('.right-column')).toHaveLength(1)
  })

  it('should call fetchApis on mount', () => {
    expect(props.fetchApis).toHaveBeenCalledTimes(1)
    wrapper.setProps({ apis: mockApis })
    expect(wrapper.state().apis).toEqual(mockApis)
  })

  it('should update endpoints state with new props', () => {
    wrapper.setProps({ endpoints: mockEndpoints })
    expect(wrapper.state().endpoints).toEqual(mockEndpoints.records)
  })

  it('should update ui state with new props', () => {
    wrapper.setProps({ ui: { loading: true } })
    expect(wrapper.state().ui.loading).toEqual(true)
  })

  it('should select an api and version', () => {
    wrapper.find(Select).at(0).simulate('change', { target: { name: 'selectedApi', value: 'test' } })
    expect(wrapper.state().selectedApi).toEqual(mockApis[0])
    expect(wrapper.state().selectedVersion).toEqual(mockApis[0].versions[0])

    expect(props.fetchEndpoints).toHaveBeenCalledWith(mockApis[0].api, mockApis[0].versions[0])
  })

  it('should change api version', () => {
    wrapper.find(Select).at(1).simulate('change', { target: { name: 'selectedVersion', value: '2.2.1' } })
    expect(wrapper.state().selectedVersion).toEqual(mockApis[0].versions[1])
    expect(props.fetchEndpoints).toHaveBeenCalledWith(mockApis[0].api, mockApis[0].versions[1])
  })

  it('should call fetchScenarios on filter click', () => {
    const selectedEndpoints = [mockEndpoints.records[0]]
    wrapper.setState({ selectedEndpoints })
    wrapper.find('#filter-button').first().simulate('click')
    expect(props.fetchScenarios).toHaveBeenCalledWith([selectedEndpoints[0].id])
  })

  it('should update scenarios state with new props', () => {
    wrapper.setProps({ scenarios: mockScenarios })
    expect(wrapper.state().scenarios).toEqual(mockScenarios)
  })

  it('should render 2 scenarios as results', () => {
    wrapper.setProps({ scenarios: mockScenarios })
    expect(wrapper.find('.scenario-row')).toHaveLength(2)
  })

  it('should load scenario data on row click', () => {
    wrapper.find('.scenario-row').first().simulate('click')
    expect(props.getScenario).toHaveBeenCalledWith(mockScenarios[0].scenarioId)
  })

  it('should update scenario state with new props', () => {
    wrapper.setProps({ scenario: mockScenario })
    expect(wrapper.state().scenario).toEqual(
      {
        ...mockScenario,
        body: JSON.stringify(JSON.parse(mockScenario.body), null, 3),
        endpoints: mockScenario.endpoints,
      })
  })

  it('should navigate to api references', () => {
    wrapper.find('.action-wrapper').at(1).simulate('click')
    expect(props.history.push).toHaveBeenCalledWith('/api-references')
  })

  describe('reducer', () => {
    const initialState = {
      data: [],
      scenario: {},
      endpoints: {},
      apis: [],
      ui: {
        loading: false,
      },
    }

    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should update state on FETCH_APIS', () => {
      expect(reducer(initialState, fetchApis()))
        .toEqual({
          ...initialState,
          ui: { loading: true },
        })
    })

    it('should update state on FETCH_APIS_SUCCESS', () => {
      expect(reducer(initialState, fetchApisSuccess(mockApis)))
        .toEqual({
          ...initialState,
          ui: { loading: false },
          apis: mockApis,
        })
    })

    it('should update state on FETCH_APIS_ERROR', () => {
      expect(reducer(initialState, fetchApisError(errorMock)))
        .toEqual({ ...initialState, ui: { loading: false }, apis: [] })
    })

    it('should update state on FETCH_ENDPOINTS', () => {
      expect(reducer(initialState, fetchEndpoints()))
        .toEqual({
          ...initialState,
          ui: { loading: true },
        })
    })

    it('should update state on FETCH_ENDPOINTS_SUCCESS', () => {
      expect(reducer(initialState, fetchEndpointsSuccess(mockEndpoints)))
        .toEqual({
          ...initialState,
          ui: { loading: false },
          endpoints: mockEndpoints,
        })
    })

    it('should update state on FETCH_ENDPOINTS_ERROR', () => {
      expect(reducer(initialState, fetchEndpointsError(errorMock)))
        .toEqual({ ...initialState, ui: { loading: false }, endpoints: {} })
    })

    it('should update state on FETCH_SCENARIOS', () => {
      expect(reducer(initialState, fetchScenarios()))
        .toEqual({
          ...initialState,
          ui: { loading: true },
        })
    })

    it('should update state on FETCH_SCENARIOS_SUCCESS', () => {
      const data = { records: mockScenarios }
      expect(reducer(initialState, fetchScenariosSuccess(data)))
        .toEqual({
          ...initialState,
          ui: { loading: false },
          data: mockScenarios,
        })
    })

    it('should update state on FETCH_SCENARIOS_ERROR', () => {
      expect(reducer(initialState, fetchScenariosError(errorMock)))
        .toEqual({ ...initialState, ui: { loading: false }, data: {} })
    })

    it('should update state on GET_SCENARIO', () => {
      expect(reducer(initialState, getScenario()))
        .toEqual({
          ...initialState,
          ui: { loading: true },
        })
    })

    it('should update state on GET_SCENARIO_SUCCESS', () => {
      expect(reducer(initialState, getScenarioSuccess(mockScenario)))
        .toEqual({
          ...initialState,
          ui: { loading: false },
          scenario: mockScenario,
        })
    })

    it('should update state on GET_SCENARIO_ERROR', () => {
      expect(reducer(initialState, getScenarioError(errorMock)))
        .toEqual({ ...initialState, ui: { loading: false }, scenario: {} })
    })
  })

  describe('sagas', () => {
    it('should call fetchApis and return an array', () => {
      const fakeResponse = { data: mockApis }

      return expectSaga(rootSaga)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(fetchApisSuccess(mockApis))
        .dispatch(fetchApis())
        .silentRun()
    })

    it('should call fetchApis and handle the error', () => {
      const fakeResponse = { err: errorMock }

      expectSaga(rootSaga)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(fetchApisError(errorMock))
        .dispatch(fetchApis())
        .silentRun()
    })

    it('should call fetchEndpoints and return an object', () => {
      const fakeResponse = { data: mockEndpoints }

      return expectSaga(rootSaga)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(fetchEndpointsSuccess(mockEndpoints))
        .dispatch(fetchEndpoints())
        .silentRun()
    })

    it('should call fetchEndpoints and handle the error', () => {
      const fakeResponse = { err: errorMock }

      expectSaga(rootSaga)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(fetchEndpointsError(errorMock))
        .dispatch(fetchEndpoints())
        .silentRun()
    })

    it('should call fetchScenarios and return an object', () => {
      const fakeResponse = { data: mockScenarios }

      return expectSaga(rootSaga)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(fetchScenariosSuccess(mockScenarios))
        .dispatch(fetchScenarios())
        .silentRun()
    })

    it('should call fetchScenarios and handle the error', () => {
      const fakeResponse = { err: errorMock }

      expectSaga(rootSaga)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(fetchScenariosError(errorMock))
        .dispatch(fetchScenarios())
        .silentRun()
    })

    it('should call getScenario and return an object', () => {
      const fakeResponse = { data: mockScenario }

      return expectSaga(rootSaga)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(getScenarioSuccess(mockScenario))
        .dispatch(getScenario())
        .silentRun()
    })

    it('should call getScenario and handle the error', () => {
      const fakeResponse = { err: errorMock }

      expectSaga(rootSaga)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(getScenarioError(errorMock))
        .dispatch(getScenario())
        .silentRun()
    })
  })
})
