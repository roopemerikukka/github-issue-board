import user, { initialState } from '../../src/reducers/User'
import * as authActions from '../../src/actions/Auth'
import * as userActions from '../../src/actions/User'

describe('User reducer tests', () => {
  test('shouls return initial state', () => {
    expect(user(undefined, {})).toEqual(initialState)
  })

  test('should handle request to authenticate', () => {
    const initialState = {
      isAuthenticating: false
    }

    expect(user(initialState, {
      type: authActions.REQUEST_ACCESS_TOKEN
    })).toEqual({
      isAuthenticating: true
    })
  })

  test('should hadle receiving access token', () => {
    const initialState = {
      accessToken: '',
      isAuthenticating: true,
      loggedIn: false
    }

    expect(user(initialState, {
      type: authActions.RECEIVE_ACCESS_TOKEN,
      data: 'abc'
    })).toEqual({
      accessToken: 'abc',
      isAuthenticating: false,
      loggedIn: true
    })
  })

  test('should handle log out', () => {
    const initialState = {
      accessToken: 'abc',
      loggedIn: true
    }

    expect(user(initialState, {
      type: authActions.LOG_OUT
    })).toEqual({
      accessToken: '',
      loggedIn: false
    })
  })

  test('should handle saving the user info', () => {
    const initialState = {
      user: {}
    }

    expect(user(initialState, {
      type: userActions.SAVE_USER,
      data: {
        username: 'testuser'
      }
    })).toEqual({
      user: {
        username: 'testuser'
      }
    })
  })

  test('should handle saving the organization data', () => {
    const initialState = {
      orgs: []
    }

    expect(user(initialState, {
      type: userActions.SAVE_ORG,
      data: ['org1', 'org2']
    })).toEqual({
      orgs: ['org1', 'org2']
    })
  })
})
