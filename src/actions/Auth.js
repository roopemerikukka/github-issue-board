import fetch from 'isomorphic-fetch'
import { getClientId, SECRET_KEEPER_URL } from '../settings'
import { checkStatus } from '../helpers'
import { push } from 'react-router-redux'
import { fetchRepositoriesIfNotBusy, invalidateRepos } from './Repositories'
import { fetchUserInformationIfNeeded } from './User'

export const REQUEST_ACCESS_TOKEN = 'REQUEST_ACCESS_TOKEN'
export const RECEIVE_ACCESS_TOKEN = 'RECEIVE_ACCESS_TOKEN'
export const LOG_OUT = 'LOG_OUT'

const requestAuthToken = () => {
  return {
    type: REQUEST_ACCESS_TOKEN
  }
}

const receiveAccessToken = (token) => {
  return {
    type: RECEIVE_ACCESS_TOKEN,
    data: token
  }
}

const requestLogOut = () => {
  return {
    type: LOG_OUT
  }
}

export const logOut = () => {
  return dispatch => {
    dispatch(requestLogOut())
    dispatch(invalidateRepos())
  }
}

const authenticate = (code, state) => {
  return (dispatch) => {
    dispatch(requestAuthToken())
    let clientId = getClientId()
    return fetch(`${SECRET_KEEPER_URL}/${clientId}/${code}`)
      .then(checkStatus)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveAccessToken(json.access_token))
        dispatch(fetchRepositoriesIfNotBusy())
        dispatch(fetchUserInformationIfNeeded())
        dispatch(push({pathname: '/dashboard'}))
      })
      .catch(error => console.log('Error fetching the access token.', error))
  }
}

const shouldAuthenticate = (state) => {
  let { loggedIn, isAuthenticating } = state.user
  if (loggedIn || isAuthenticating) {
    return false
  } else {
    return true
  }
}

export const authIfNeeded = (code) => {
  return (dispatch, getState) => {
    if (shouldAuthenticate(getState())) {
      return dispatch(authenticate(code, getState()))
    } else {
      return Promise.resolve()
    }
  }
}
