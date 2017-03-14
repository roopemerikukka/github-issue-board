import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers'
import App from './containers/App/App'
import Login from './containers/Login/Login'
import Dashboard from './containers/Dashboard/Dashboard'
import Settings from './containers/Settings/Settings'
import ErrorPage from './containers/ErrorPage/ErrorPage'
import './index.css'
import { throttle, loadFonts } from './helpers'
import { LOCAL_STORAGE_KEY } from './settings'
import './fonts/fonts.css'

// load fonts.
loadFonts()

const middleware = [ thunk ]
middleware.push(routerMiddleware(browserHistory))
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify here name, actionsBlacklist, actionsCreators and other options
  }) : compose

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
)

// Check if there is already a store in localStorage.
const persistedState = window.localStorage.getItem(LOCAL_STORAGE_KEY) ? JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY)) : {}

const store = createStore(reducer, persistedState, enhancer)

// Subscribe for actions and save the store to localStorage.
store.subscribe(throttle(() => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store.getState()))
}))

const history = syncHistoryWithStore(browserHistory, store)

const authNeeded = (store) => {
  return (nextState, replace) => {
    let { user } = store.getState()
    if (!user || !user.loggedIn) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }
}

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App} >
        <Route path='dashboard' component={Dashboard} onEnter={authNeeded(store)} />
        <Route path='settings' component={Settings} onEnter={authNeeded(store)} />
        <Route path='login' component={Login} />
        <Route path='*' component={ErrorPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
