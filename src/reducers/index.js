import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from './User'
import repositories from './Repositories'
import uistate from './UIState'

const rootReducer = combineReducers({
  user,
  repositories,
  uistate,
  routing: routerReducer
})

export default rootReducer
