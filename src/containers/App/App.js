import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { authIfNeeded, logOut } from '../../actions/Auth'
import { getClientId } from '../../settings'
import Header from '../Header/Header'

export class App extends Component {

  onLoginClick (e) {
    e.preventDefault()
    let clientId = getClientId()
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo`
  }

  onLogOutClick (e) {
    e.preventDefault()
    let { dispatch } = this.props
    dispatch(logOut())
    dispatch(push({pathname: '/login'}))
  }

  componentDidMount () {
    let { dispatch } = this.props
    let { location } = this.props.router
    let { loggedIn } = this.props.user

    // If the user is logged in, redirect to dashboard
    if (loggedIn) {
      // Prevent anyone from going to the root route
      console.log(location)
      if (location.pathname === '/' || location.pathname === '') {
        dispatch(push({pathname: '/dashboard'}))
      } else {
        dispatch(push({pathname: location.pathname}))
      }
    } else {
      // Check if the query has a the github code.
      if ('code' in location.query) {
        // Select the code from the query.
        let code = location.query.code
        dispatch(authIfNeeded(code))
      }
    }
  }

  render () {
    let { loggedIn } = this.props.user
    let { children } = this.props
    return (
      <div className='app'>
        <Header loggedIn={loggedIn} loginFn={(e) => this.onLoginClick(e)} logOutFn={(e) => this.onLogOutClick(e)} />
        <div>{ children }</div>
      </div>
    )
  }
}

const mapStateToProps = (state, router) => {
  return {
    user: state.user,
    router: router
  }
}

export default connect(
  mapStateToProps
)(App)
