import React, { Component } from 'react'
import { connect } from 'react-redux'
import Toggle from '../../components/Toggle/Toggle'
import Button from '../../components/Button/Button'
import { toggleAutoScroll } from '../../actions/UserInterface'
import { forceReloadRepositories } from '../../actions/Repositories'
import ToggleRepoList from '../ToggleRepoList/ToggleRepoList'

class Settings extends Component {
  render () {
    const { onForceReloadReposClick, onAutoScrollToggleClick } = this.props
    const { autoScroll } = this.props.uistate
    return (
      <div>
        Settings
        <div>
          <Button label='force reload' onClickFn={onForceReloadReposClick} />
        </div>
        <div>
          <label>
            <Toggle
              checked={autoScroll}
              onChange={e => { onAutoScrollToggleClick() }}
              label='AutoScroll' />
          </label>
        </div>
        <ToggleRepoList />
      </div>
    )
  }
}

const mapStateToProps = (state, router) => {
  return {
    repositories: state.repositories.data,
    uistate: state.uistate,
    router: router
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onForceReloadReposClick: () => {
      dispatch(forceReloadRepositories())
    },
    onAutoScrollToggleClick: () => {
      dispatch(toggleAutoScroll())
    },
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
