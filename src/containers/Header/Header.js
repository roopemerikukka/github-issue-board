import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import screenfull from 'screenfull'
import classNames from 'classnames'
import NetworkStatus from '../../components/NetworkStatus/NetworkStatus'
import Button from '../../components/Button/Button'
import { Icon } from 'react-fa'
import './Header.css'

export class Header extends Component {

  constructor () {
    super()

    this.state = {
      online: window.navigator.onLine,
      interval: 5000
    }
  }

  toggleFullscreen (e) {
    e.preventDefault()
    if (screenfull.enabled) {
      screenfull.toggle()
    }
  }

  componentDidMount () {
    setInterval(() => {
      if (this.state.online !== window.navigator.onLine) {
        this.setState({ online: window.navigator.onLine })
      }
    }, this.state.interval)
  }

  render () {
    let { loggedIn, logOutFn, loginFn } = this.props
    const headerClassname = classNames({
      'app-header': true,
      'app-header--logged-in': loggedIn
    })
    return (
      <header className={headerClassname} style={{marginTop: '2px'}}>
        <NetworkStatus online={this.state.online} />
        <div className='app-identifiers'>
          <Link to='dashboard'>
            <h1 className='logo'>GitHub issue board</h1>
          </Link>
        </div>
        <nav>
          { !loggedIn &&
            <Button onClickFn={loginFn} icon='github' label='Log In' />
          }
          { loggedIn &&
            <div>
              <Button onClickFn={logOutFn} flat label='Log out' />
              <Link to='settings'>
                <Icon name='cog' className='settings icon' />
              </Link>
              { screenfull.enabled &&
                <Icon name='arrows-alt' className='fullscreen icon' onClick={(e) => this.toggleFullscreen(e)} />
              }
            </div>
          }
        </nav>
      </header>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    uistate: state.uistate,
    router: ownProps
  }
}

export default connect(
  mapStateToProps
)(Header)
