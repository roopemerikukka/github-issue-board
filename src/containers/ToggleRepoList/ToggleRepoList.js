import React, { Component } from 'react'
import { connect } from 'react-redux'
import Masonry from 'react-masonry-component'
import classNames from 'classnames'
import Toggle from '../../components/Toggle/Toggle'
import { enableRepository, disableRepository, enableRepositoryOwner, disableRepositoryOwner } from '../../actions/UserInterface'
import './ToggleRepoList.css'

class ToggleRepoList extends Component {
  isRepoEnabled (repoId) {
    const { disabledRepos } = this.props.uistate
    return !disabledRepos.includes(repoId)
  }

  isOwnerEnabled (ownerId) {
    const { disabledOwners } = this.props.uistate
    return !disabledOwners.includes(ownerId)
  }

  changeRepoState (event, repoId) {
    const { dispatch } = this.props
    const checked = event.target.checked
    if (checked) {
      dispatch(enableRepository(repoId))
    } else {
      dispatch(disableRepository(repoId))
    }
  }

  changeOwnerState (event, ownerId) {
    const { dispatch } = this.props
    const checked = event.target.checked
    if (checked) {
      dispatch(enableRepositoryOwner(ownerId))
      this.enableReposByOwner(ownerId)
    } else {
      dispatch(disableRepositoryOwner(ownerId))
      this.disableReposByOwner(ownerId)
    }
  }

  disableReposByOwner (ownerId) {
    const { repositories, dispatch } = this.props
    repositories.forEach(repo => {
      if (repo.owner.id === ownerId) {
        dispatch(disableRepository(repo.id))
      }
    })
  }

  enableReposByOwner (ownerId) {
    const { repositories, dispatch } = this.props
    repositories.forEach(repo => {
      if (repo.owner.id === ownerId) {
        dispatch(enableRepository(repo.id))
      }
    })
  }

  sortReposByOwner () {
    const { repositories } = this.props
    let owners = []
    let reposByOwner = {}

    let ownerIds = []

    // Collect all repository owners.
    for (let repo of repositories) {
      if (!ownerIds.includes(repo.owner.id)) {
        owners.push(repo.owner)
        ownerIds.push(repo.owner.id)
      }
    }

    for (let owner of owners) {
      reposByOwner[owner.id] = repositories.filter(repo => {
        return repo.owner.login === owner.login
      })
    }

    return owners.map(owner => {
      return (
        <li key={owner.id} className='toggle-repo-list__item'>
          <Toggle
            checked={this.isOwnerEnabled(owner.id)}
            onChange={e => this.changeOwnerState(e, owner.id)}
            label={owner.login}
            />
          <ul>
            {reposByOwner[owner.id].map(repo => {
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
      <Masonry
        className={toggleListClasses}
        elementType={'ul'}
        >
        {this.sortReposByOwner()}
      </Masonry>
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
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToggleRepoList)
