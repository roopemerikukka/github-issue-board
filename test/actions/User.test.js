import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../src/actions/User'
import nock from 'nock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('User actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should fetch user information if logged in', () => {
    nock(`https://api.github.com`)
      .get(`/user?access_token=abc`)
      .reply(200, {
        login: 'some_username'
      })

    nock(`https://api.github.com`)
      .get(`/users/some_username/orgs`)
      .reply(200, {
        data: 'some org data'
      })

    const store = mockStore({
      user: {
        loggedIn: true,
        isAuthenticating: false,
        accessToken: 'abc'
      }
    })

    const expectedActions = [
      { type: actions.SAVE_USER, data: {login: 'some_username'} }
    ]

    return store.dispatch(actions.fetchUserInformationIfNeeded())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  test('should not fetch anything if user is not logged in', () => {
    const store = mockStore({
      user: {
        loggedIn: false
      }
    })

    const expectedActions = []

    return store.dispatch(actions.fetchUserInformationIfNeeded())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  test('should fetch org information if username is given', () => {
    nock(`https://api.github.com`)
      .get(`/users/some_username/orgs`)
      .reply(200, {
        data: 'some org data'
      })

    const store = mockStore()

    const expectedActions = [
      { type: actions.SAVE_ORG, data: { data: 'some org data' } }
    ]

    return store.dispatch(actions.fetchOrganizationInformation('some_username'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
