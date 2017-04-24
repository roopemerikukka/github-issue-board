import {
  ENABLE_REPO,
  DISABLE_REPO,
  INVALIDATE_UI,
  TOGGLE_AUTOSCROLL,
  ENABLE_OWNER,
  DISABLE_OWNER
} from '../actions/UserInterface'

export const initialState = {
  online: window.navigator.onLine,
  disabledRepos: [],
  disabledOwners: [],
  autoScroll: false
}

const uiState = (state = initialState, action) => {
  switch (action.type) {
    case DISABLE_REPO:
      return {
        ...state,
        disabledRepos: [...state.disabledRepos, action.data]
      }
    case ENABLE_REPO:
      return {
        ...state,
        disabledRepos: [...state.disabledRepos].filter(repoId => {
          return repoId !== action.data
        })
      }
    case ENABLE_OWNER:
      return {
        ...state,
        disabledOwners: [...state.disabledOwners].filter(ownerId => {
          return ownerId !== action.data
        })
      }
    case DISABLE_OWNER:
      return {
        ...state,
        disabledOwners: [...state.disabledOwners, action.data]
      }
    case TOGGLE_AUTOSCROLL:
      return {
        ...state,
        autoScroll: !state.autoScroll
      }
    case INVALIDATE_UI:
      return initialState
    default:
      return state
  }
}

export default uiState
