import React from 'react'
import { mountWithIntl } from 'util/test-utils'
import request from 'util/request'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import ExternalResources from './ExternalResources'
import reducer, { fetchResources, fetchResourcesSuccess, fetchResourcesError } from './ducks'
import { fetchResourcesSaga } from './sagas'
import { translationMessages, formats } from 'util/i18n'
import { IntlProvider } from 'react-intl'

const intlProvider = new IntlProvider({locale: 'en', messages: translationMessages['en'], formats})
const { intl } = intlProvider.getChildContext()

const errorMock = {message: 'error-stub'}
const mockResources = {
  'source_account': '',
  'external_resources': [
    {
      'id': 1,
      'repo_id': 85329044,
      'name': 'ImageDetectionDemoApp',
      'description': 'A demo Cordova app for the ImageDetectionCordovaPlugin',
      'url': 'https://api.github.com/repos/a31859/ImageDetectionDemoApp',
      'commit_sha': 'd1dff7c',
      'commit_url': 'https://api.github.com/repos/a31859/ImageDetectionDemoApp/commits/d1dff7c3d0393ad1613ccad4b8ace247e9fde15f',
      'created_at': '2019-05-21T16:51:51.000Z',
      'updated_at': '2019-05-21T16:51:51.000Z'
    },
    {
      'id': 2,
      'repo_id': 78196659,
      'name': 'tuise-bot',
      'description': 'The Tuise bot',
      'url': 'https://api.github.com/repos/a31859/tuise-bot',
      'commit_sha': 'afd9710',
      'commit_url': 'https://api.github.com/repos/a31859/tuise-bot/commits/afd9710221a09027732fb513ade6b01bc9887be8',
      'created_at': '2019-05-21T16:51:51.000Z',
      'updated_at': '2019-05-21T16:51:51.000Z'
    },
    {
      'id': 3,
      'repo_id': 75099753,
      'name': 'tuise-api',
      'description': 'Tuise, the TUI bot.',
      'url': 'https://api.github.com/repos/a31859/tuise-api',
      'commit_sha': '2deb207',
      'commit_url': 'https://api.github.com/repos/a31859/tuise-api/commits/2deb207b505b61bcbbbabb8c969a61903eae9ec7',
      'created_at': '2019-05-21T16:51:51.000Z',
      'updated_at': '2019-05-21T16:51:51.000Z'
    },
    {
      'id': 4,
      'repo_id': 34993878,
      'name': 'VIDIT-html5-video-editor',
      'description': 'A HTML5 Video Editor Application',
      'url': 'https://api.github.com/repos/a31859/VIDIT-html5-video-editor',
      'commit_sha': '7cdbac1',
      'commit_url': 'https://api.github.com/repos/a31859/VIDIT-html5-video-editor/commits/7cdbac134fada31b81db0f5266b8ff284a2a6027',
      'created_at': '2019-05-21T16:51:51.000Z',
      'updated_at': '2019-05-21T16:51:51.000Z'
    }
  ],
  'pagination': {
    'page': 1,
    'pageSize': 2,
    'rowCount': 4,
    'pageCount': 2
  }
}

describe('<ExternalResources />', () => {
  const props = {
    intl,
    resources: {
      source_account: '',
      external_resources: [],
      pagination: {
        page: 1,
        pageSize: 2,
        rowCount: 4,
        pageCount: 2
      }
    },
    fetchResources: jest.fn()
  }

  const wrapper = mountWithIntl(<ExternalResources {...props} />)

  it('should call fetchResources on mount', () => {
    expect(props.fetchResources).toHaveBeenCalledTimes(1)
  })

  it('should render 4 external resources', () => {
    wrapper.setProps({ resources: mockResources })
    expect(wrapper.find('.resource-row')).toHaveLength(4)
  })

  it('should call fetchResources on pagination button click', () => {
    wrapper.find('.pagination-btn').at(2).simulate('click')
    expect(props.fetchResources).toHaveBeenCalledWith(2)
  })

  describe('reducer', () => {
    const initialState = {
      data: {
        source_account: '',
        external_resources: [],
        pagination: {}
      },
      ui: {
        loading: false
      }
    }

    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should update state on FETCH_RESOURCES', () => {
      expect(reducer(initialState, fetchResources())).toEqual({...initialState, ui: {loading: true}})
    })

    it('should update state on FETCH_RESOURCES_SUCCESS', () => {
      expect(reducer(initialState, fetchResourcesSuccess(mockResources))).toEqual({...initialState, data: mockResources})
    })

    it('should update state on FETCH_RESOURCES_ERROR', () => {
      expect(reducer(initialState, fetchResourcesError(errorMock))).toEqual({...initialState, data: {}})
    })
  })

  describe('sagas', () => {
    it('should call fetchResources and return an object', () => {
      const fakeResponse = {data: mockResources}

      return expectSaga(fetchResourcesSaga)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(fetchResourcesSuccess(mockResources))
        .dispatch(fetchResources())
        .silentRun()
    })

    it('should call fetchResources and handle the error', () => {
      const fakeResponse = {err: errorMock}

      return expectSaga(fetchResourcesSaga)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(fetchResourcesError(errorMock))
        .dispatch(fetchResources())
        .silentRun()
    })
  })
})
