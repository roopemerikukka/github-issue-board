/**
 * get some user data like: username, name, orgs, avatar
 *
 * https://api.github.com/user?access_token=${token}
 * https://api.github.com/users/${username}/orgs
 */
import fetch from 'isomorphic-fetch'
import { checkStatus } from '../helpers'

export const SAVE_USER = 'SAVE_USER'
export const SAVE_ORG = 'SAVE_ORG'

const saveUserInformation = (userInformation) => {
  return {
    type: SAVE_USER,
    data: userInformation
  }
}

const saveOrganizationInformation = (organizationInformation) => {
  return {
    type: SAVE_ORG,
    data: organizationInformation
  }
}

const shouldFetchUserInformation = (state) => {
  const { loggedIn, isAuthenticating, accessToken } = state.user
  if (!loggedIn || isAuthenticating || accessToken.length === 0) {
    return false
  }
  return true
}

export const fetchOrganizationInformation = (username) => {
  return (dispatch, getState) => {
    return fetch(`https://api.github.com/users/${username}/orgs`)
      .then(checkStatus)
      .then(response => response.json())
      .then(json => {
        dispatch(saveOrganizationInformation(json))
      })
  }
}

const fetchUserInformation = () => {
  return (dispatch, getState) => {
    const { accessToken } = getState().user
    return fetch(`https://api.github.com/user?access_token=${accessToken}`)
      .then(checkStatus)
      .then(response => response.json())
      .then(json => {
        const username = json.login
        dispatch(saveUserInformation(json))
        dispatch(fetchOrganizationInformation(username))
      })
  }
}

export const fetchUserInformationIfNeeded = () => {
  return (dispatch, getState) => {
    if (shouldFetchUserInformation(getState())) {
      return dispatch(fetchUserInformation())
    } else {
      return Promise.resolve()
    }
  }
}
