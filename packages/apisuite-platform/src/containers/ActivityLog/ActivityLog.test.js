import React from 'react'
import { mountWithIntl } from 'util/test-utils'
import request from 'util/request'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import ActivityLog from './ActivityLog'
import reducer, {
  fetchActivities,
  fetchActivitiesSuccess,
  fetchActivitiesError,
  fetchKpis,
  fetchKpisSuccess,
  fetchKpisError
} from './ducks'
import { fetchActivitiesSaga, fetchKpisSaga } from './sagas'

const mockActivities = {
  'pagination': {
    'page': 1,
    'pageSize': 50,
    'rowCount': 3,
    'pageCount': 1
  },
  'records': [
    {
      'id': 17,
      'action': 'USER_LOGIN',
      'creator': {
        'id': 31,
        'email': 'sergio@cloudoki.com',
        'fullName': 'antonio simoes',
        'avatar': '',
        'bio': '',
        'phone': '+351924298254',
        'activated': true,
        'github': false,
        'created': '2018-12-13T19:41:27.000Z',
        'updated': '2019-01-07T17:00:05.000Z'
      },
      'organization': {
        'id': 31,
        'name': 'the vast company',
        'vat': '12345',
        'website': 'http://www.vast.eu.com',
        'description': null,
        'logoUrl': null,
        'policyUrl': null,
        'state': 'NON_TRUSTED',
        'createdAt': '2018-12-13T19:41:27.000Z',
        'updatedAt': '2018-12-13T19:41:27.000Z'
      },
      'category': 'user',
      'additionalInfo': 'user undefined has logged in.',
      'created': '2019-06-03T15:06:21.000Z'
    },
    {
      'id': 18,
      'action': 'USER_LOGIN',
      'creator': {
        'id': 179,
        'email': 'claudio@cloudoki.com',
        'fullName': 'Claudio A',
        'avatar': '',
        'bio': 'This is my bio',
        'phone': '+351968317863',
        'activated': true,
        'github': false,
        'created': '2019-01-29T15:48:16.000Z',
        'updated': '2019-04-05T11:18:51.000Z'
      },
      'organization': {
        'id': 182,
        'name': 'Yis',
        'vat': '1231232321',
        'website': 'www.yis.pt',
        'description': 'comp',
        'logoUrl': null,
        'policyUrl': 'www.termsuse.com',
        'state': 'NON_TRUSTED',
        'createdAt': '2019-01-29T15:48:16.000Z',
        'updatedAt': '2019-04-09T17:49:22.000Z'
      },
      'category': 'user',
      'additionalInfo': 'user undefined has logged in.',
      'created': '2019-06-03T16:32:50.000Z'
    },
    {
      'id': 19,
      'action': 'USER_LOGIN',
      'creator': {
        'id': 179,
        'email': 'claudio@cloudoki.com',
        'fullName': 'Claudio A',
        'avatar': '',
        'bio': 'This is my bio',
        'phone': '+351968317863',
        'activated': true,
        'github': false,
        'created': '2019-01-29T15:48:16.000Z',
        'updated': '2019-04-05T11:18:51.000Z'
      },
      'organization': {
        'id': 182,
        'name': 'Yis',
        'vat': '1231232321',
        'website': 'www.yis.pt',
        'description': 'comp',
        'logoUrl': null,
        'policyUrl': 'www.termsuse.com',
        'state': 'NON_TRUSTED',
        'createdAt': '2019-01-29T15:48:16.000Z',
        'updatedAt': '2019-04-09T17:49:22.000Z'
      },
      'category': 'user',
      'additionalInfo': 'user undefined has logged in.',
      'created': '2019-06-03T16:35:47.000Z'
    }
  ]
}

const mockKpis = {
  'appCount': 2,
  'testUserLoginCount': 3,
  'portalLoginCount': 5
}

const mockOrganization = {id: 208, name: 'myOrg', state: 'NON_VALIDATED'}

const mockState = {
  auth: {
    user: {
      organizations: [
        mockOrganization
      ]
    }
  }
}
const errorMock = {message: 'error-load-activity'}

describe('<ActivityLog />', () => {
  const props = {
    fetchActivities: jest.fn(),
    fetchKpis: jest.fn(),
    logs: {},
    kpis: {},
    user: {
      id: 204,
      organizations: [
        mockOrganization
      ]
    },
    intl: {},
    ui: {
      loading: false
    }
  }

  const wrapper = mountWithIntl(<ActivityLog {...props} />)

  it('should have a div as parent', () => {
    expect(wrapper.find('.activity-container')).toHaveLength(1)
  })

  it('should call fetchActivities on mount', () => {
    expect(props.fetchActivities).toHaveBeenCalledTimes(1)
    wrapper.setProps({logs: mockActivities})
    expect(wrapper.state().logs).toEqual(mockActivities)
  })

  it('should call fetchKpis on mount', () => {
    expect(props.fetchKpis).toHaveBeenCalledTimes(1)
    wrapper.setProps({kpis: mockKpis})
    expect(wrapper.state().kpis).toEqual(mockKpis)
  })

  it('should update ui state with new props', () => {
    wrapper.setProps({ui: {loading: true}})
    expect(wrapper.state().ui.loading).toEqual(true)
  })

  it('should render 3 kpis', () => {
    expect(wrapper.find('.kpi-container')).toHaveLength(3)
  })

  describe('reducer', () => {
    const initialState = {
      logs: {},
      kpis: {},
      ui: {
        loading: false
      }
    }

    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should update state on FETCH_ACTIVITIES', () => {
      expect(reducer(initialState, fetchActivities()))
        .toEqual({
          ...initialState,
          ui: {
            loading: true
          }
        })
    })

    it('should update state on FETCH_ACTIVITIES_SUCCESS', () => {
      const mockActivities = {}
      expect(reducer(initialState, fetchActivitiesSuccess(mockActivities)))
        .toEqual({
          ...initialState,
          ui: {
            loading: false
          },
          logs: mockActivities
        })
    })

    it('should update state on FETCH_ACTIVITIES_ERROR', () => {
      expect(reducer(initialState, fetchActivitiesError(errorMock)))
        .toEqual({
          ...initialState,
          ui: {
            loading: false
          },
          logs: {}
        })
    })

    it('should update state on FETCH_KPIS', () => {
      expect(reducer(initialState, fetchKpis()))
        .toEqual({
          ...initialState,
          ui: {
            loading: true
          }
        })
    })

    it('should update state on FETCH_KPIS_SUCCESS', () => {
      const mockKpis = []
      expect(reducer(initialState, fetchKpisSuccess(mockKpis)))
        .toEqual({
          ...initialState,
          ui: {
            loading: false
          },
          kpis: mockKpis
        })
    })

    it('should update state on FETCH_KPIS_ERROR', () => {
      expect(reducer(initialState, fetchKpisError(errorMock)))
        .toEqual({
          ...initialState,
          ui: {
            loading: false
          },
          kpis: {}
        })
    })
  })

  describe('sagas', () => {
    const filters = {
      page: 1,
      pageSize: 50,
      category: 'general',
      from: 123,
      to: 1234
    }

    it('should call fetchActivities and return an object', () => {
      const mockActivities = {}
      const fakeResponse = {data: mockActivities}
      return expectSaga(fetchActivitiesSaga)
        .withState(mockState)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(fetchActivitiesSuccess(mockActivities))
        .dispatch(fetchActivities({filters}))
        .silentRun()
    })

    it('should call fetchActivities and handle the error', () => {
      const fakeResponse = {err: errorMock}
      return expectSaga(fetchActivitiesSaga)
        .withState(mockState)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(fetchActivitiesError(errorMock))
        .dispatch(fetchActivities({filters}))
        .silentRun()
    })

    it('should call fetchKpis and return an array', () => {
      const mockKpis = []
      const fakeResponse = {data: mockKpis}
      return expectSaga(fetchKpisSaga)
        .withState(mockState)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(fetchKpisSuccess(mockKpis))
        .dispatch(fetchKpis())
        .silentRun()
    })

    it('should call fetchKpis and handle the error', () => {
      const fakeResponse = {err: errorMock}
      return expectSaga(fetchKpisSaga)
        .withState(mockState)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(fetchKpisError(errorMock))
        .dispatch(fetchKpis({filters}))
        .silentRun()
    })
  })
})
