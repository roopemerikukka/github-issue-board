import {
  RECEIVE_ACCESS_TOKEN,
  REQUEST_ACCESS_TOKEN,
  LOG_OUT
} from '../actions/Auth'

import { SAVE_USER, SAVE_ORG } from '../actions/User'

export const initialState = {
  loggedIn: false,
  isAuthenticating: false,
  accessToken: '',
  scopes: [],
  user: {},
  orgs: []
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_ACCESS_TOKEN:
      return {
        ...state,
        isAuthenticating: true
      }
    case RECEIVE_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.data,
        isAuthenticating: false,
        loggedIn: true
      }
    case LOG_OUT:
      return {
        ...state,
        loggedIn: false,
        accessToken: ''
      }
    case SAVE_USER:
      return {
        ...state,
        user: action.data
      }
    case SAVE_ORG:
      return {
        ...state,
        orgs: action.data
      }
    default:
      return state
  }
}

export default user
