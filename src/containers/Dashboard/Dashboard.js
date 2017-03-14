import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon } from 'react-fa'
import Masonry from 'react-masonry-component'
import Repository from '../Repository/Repository'
import { updateReposIfNeeded } from '../../actions/Repositories'
import AutoScroll from '../../components/AutoScroll/AutoScroll'
import './Dashboard.css'

export class Dashboard extends Component {

  componentDidMount () {
    let { dispatch } = this.props
    setInterval(() => {
      dispatch(updateReposIfNeeded())
    }, 500)
  }

  shouldShowRepo (repo) {
    const { disabledRepos } = this.props
    return repo.issues && repo.issues.length > 0 && !disabledRepos.includes(repo.id)
  }

  getRepoList () {
    let repos = this.props.repositories
    if (repos.length > 0) {
      repos = repos.map(repo => {
        if (this.shouldShowRepo(repo)) {
          return (
            <li key={repo.id} className='repolist__item'>
              <Repository repo={repo} />
            </li>
          )
        }
      })
      return repos
    } else {
      return (<li><Icon spin name='spinner' /></li>)
    }
  }

  render () {
    const { autoScrollEnabled } = this.props
    let repos = this.getRepoList()
    return (
      <div>
        <Masonry
          className={'repolist'}
          elementType={'ul'}
        >
          {repos}
        </Masonry>
        <AutoScroll active={autoScrollEnabled} />
      </div>
    )
  }
}

const mapStateToProps = (state, router) => {
  return {
    repositories: state.repositories.data,
    disabledRepos: state.uistate.disabledRepos,
    router: router,
    autoScrollEnabled: state.uistate.autoScroll
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
)(Dashboard)
