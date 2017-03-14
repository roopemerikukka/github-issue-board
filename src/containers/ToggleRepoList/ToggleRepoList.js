import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Toggle from '../../components/Toggle/Toggle'
import { enableRepository, disableRepository } from '../../actions/UserInterface'

class ToggleRepoList extends Component {

  isRepoEnabled (repoId) {
    const { disabledRepos } = this.props.uistate
    return !disabledRepos.includes(repoId)
  }

  changeRepoState (event, repoId) {
    const { onEnableRepoClick, onDisableRepoClick } = this.props
    const checked = event.target.checked
    if (checked) {
      onEnableRepoClick(repoId)
    } else {
      onDisableRepoClick(repoId)
    }
  }

  sortReposByOwner () {
    const { repositories } = this.props
    let owners = []
    let reposByOwner = {}

    // Collect all repository owners.
    for (let repo of repositories) {
      if (!owners.includes(repo.owner.login)) {
        owners.push(repo.owner.login)
      }
    }

    for (let owner of owners) {
      reposByOwner[owner] = repositories.filter(repo => {
        return repo.owner.login === owner
      })
    }

    return owners.map(owner => {
      return (
        <li key={owner}>{owner}
          <ul>
            {reposByOwner[owner].map(repo => {
              return (
                <li key={repo.id}>
                  <Toggle
                    checked={this.isRepoEnabled(repo.id)}
                    onChange={(e) => this.changeRepoState(e, repo.id)}
                    label={repo.name}
                  />
                </li>
              )
            })}
          </ul>
        </li>
      )
    })
  }

  render () {
    const toggleListClasses = classNames({
      'toggle-repo-list': true
    })

    return (
      <ul className={toggleListClasses}>
        {this.sortReposByOwner()}
      </ul>
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
    onEnableRepoClick: (repoId) => {
      dispatch(enableRepository(repoId))
    },
    onDisableRepoClick: (repoId) => {
      dispatch(disableRepository(repoId))
    },
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToggleRepoList)
