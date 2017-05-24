import {
REQUEST_REPOSITORIES,
RECEIVE_REPOSITORIES,
INVALIDATE_REPOS,
RECEIVED_ALL_REPOS,
RESET_REPOSITORY_FETCH
} from '../actions/Repositories'

export const initialState = {
  isFetching: false,
  updateOnProgress: false,
  hydrated: false,
  reposLastUpdated: -1,
  data: [],
  tempData: []
}

const repositories = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_REPOSITORIES:
      return {
        ...state,
        isFetching: true,
        hydrated: false,
        updateOnProgress: true
      }
    case RECEIVE_REPOSITORIES:
      return {
        ...state,
        isFetching: false,
        tempData: [...state.tempData].concat(action.data)
      }
    case RECEIVED_ALL_REPOS:
      return {
        ...state,
        hydrated: true,
        updateOnProgress: false,
        reposLastUpdated: action.data,
        data: [...state.tempData],
        tempData: []
      }
    case RESET_REPOSITORY_FETCH:
      return {
        ...state,
        isFetching: false,
        updateOnProgress: false,
        reposLastUpdated: -1,
        tempData: []
      }
    case INVALIDATE_REPOS:
      return initialState
    default:
      return state
  }
}

export default repositories
