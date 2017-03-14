import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../src/actions/Auth'
import { INVALIDATE_REPOS } from '../../src/actions/Repositories'
import nock from 'nock'
import * as settings from '../../src/settings'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const mockCode = 'code'
const mockClientId = 'clientId'

describe('Auth actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('receives access token after successful auth', () => {
    settings.getClientId = jest.fn()
      .mockImplementation(() => mockClientId)

    nock(`https://roope-secrets.herokuapp.com`)
      .get(`/clientId/code`)
      .reply(200, {
        access_token: 'abc'
      })

    const expectedActions = [
      { type: actions.REQUEST_ACCESS_TOKEN },
      { type: actions.RECEIVE_ACCESS_TOKEN, data: 'abc' }
    ]

    const store = mockStore({
      user: {
        loggedIn: false,
        isAuthenticating: false
      },
      repositories: {
        isFetching: true
      }
    })

    return store.dispatch(actions.authIfNeeded(mockCode))
      .then(() => {
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
      })
  })

  test('should create action to request log out on logOut call', () => {
    const expectedAction = {
      type: actions.LOG_OUT
    }

    const dispatch = jest.fn()
    const fn = actions.logOut()
    fn(dispatch)
    expect(dispatch).toBeCalledWith(expectedAction)
  })

  test('should create action to invalidate repos on logOut call', () => {
    const expectedAction = {
      type: INVALIDATE_REPOS
    }

    const dispatch = jest.fn()
    const fn = actions.logOut()
    fn(dispatch)
    expect(dispatch).toBeCalledWith(expectedAction)
  })

  test('should not do anyting if alrealy logged when requesting auth', () => {
    const store = mockStore({
      user: {
        loggedIn: true
      }
    })

    return store.dispatch(actions.authIfNeeded('somecode'))
      .then(() => {
        expect(store.getActions()).toEqual([])
      })
  })

  test('should catch error if gettting auth token fails', () => {
    settings.getClientId = jest.fn()
      .mockImplementation(() => mockClientId)

    nock(`https://roope-secrets.herokuapp.com`)
      .get(`/clientId/code`)
      .reply(404)

    const store = mockStore({
      user: {
        loggedIn: false,
        isAuthenticating: false
      },
      repositories: {
        isFetching: true
      }
    })

    return store.dispatch(actions.authIfNeeded(mockCode))
      .then(() => {
        expect(store.getActions()).toThrow()
      })
  })
})
