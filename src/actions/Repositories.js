import fetch from 'isomorphic-fetch'
import { checkStatus, parseLinkHeader, devlog } from '../helpers'
import { REPOSITORY_UPDATE_INTERVAL } from '../settings'

export const REQUEST_REPOSITORIES = 'REQUEST_REPOSITORIES'
export const REQUEST_UPDATE_REPOS = 'REQUEST_UPDATE_REPOS'
export const RECEIVE_REPOSITORIES = 'RECEIVE_REPOSITORIES'
export const RECEIVE_UPDATE_REPOS = 'RECEIVE_UPDATE_REPOS'
export const INVALIDATE_REPOS = 'INVALIDATE_REPOS'
export const RECEIVED_ALL_REPOS = 'RECEIVED_ALL_REPOS'
export const RESET_REPOSITORY_FETCH = 'RESET_REPOSITORY_FETCH'

const requestRepositories = () => {
  return {
    type: REQUEST_REPOSITORIES
  }
}

const receiveRepositories = (repositories) => {
  return {
    type: RECEIVE_REPOSITORIES,
    data: repositories
  }
}

const receivedAllRepos = () => {
  return {
    type: RECEIVED_ALL_REPOS,
    data: Date.now()
  }
}

const stopRepositoryFetch = () => {
  return {
    type: RESET_REPOSITORY_FETCH
  }
}

export const invalidateRepos = () => {
  return {
    type: INVALIDATE_REPOS
  }
}

// Maps repos json to more relevant format.
const mapRepositories = (repositories) => {
  return repositories.map(repo => {
    return {
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      owner: repo.owner,
      private: repo.private,
      html_url: repo.html_url,
      description: repo.description,
      url: repo.url,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
      stargazers_count: repo.stargazers_count,
      watchers_count: repo.watchers_count,
      language: repo.language,
      has_issues: repo.has_issues,
      open_issues_count: repo.open_issues_count,
      open_issues: repo.open_issues,
      watchers: repo.watchers,
      default_branch: repo.default_branch,
      permissions: repo.permissions,
      issues: []
    }
  })
}

const fetchIssues = (repo, accessToken) => {
  if (repo.open_issues_count > 0) {
    let url = `https://api.github.com/repos/${repo.full_name}/issues?access_token=${accessToken}`
    return fetch(url)
      .then(checkStatus)
      .then(response => response.json())
      .catch(error => console.error(`Failed fetching issues for repository ${repo.full_name}`, error))
  } else {
    return Promise.resolve()
  }
}

function addIssuesToRepositories (repos, accessToken) {
  return repos.map(repo => {
    return fetchIssues(repo, accessToken)
      .then(issues => {
        repo.issues = issues
        return repo
      })
  })
}

const fetchRepositories = (state, page) => {
  let { accessToken } = state.user
  return dispatch => {
    dispatch(requestRepositories())
    let links
    let url = `https://api.github.com/user/repos?access_token=${accessToken}&page=${page}`
    return fetch(url)
      .then(checkStatus)
      .then(response => {
        // Get the link headers.
        links = parseLinkHeader(response.headers.get('Link'))
        return response.json()
      })
      .then(json => {
        // Map the json to more relevant object.
        let repos = mapRepositories(json)

        // Get the issues for each repository.
        return Promise.all(addIssuesToRepositories(repos, accessToken))
      })
      .then(repos => {
        dispatch(receiveRepositories(repos))
        // Check if we need to fetch more?
        if ('next' in links) {
          dispatch(fetchRepositoriesIfNotBusy(page + 1))
        } else {
          dispatch(receivedAllRepos())
        }
      })
      .catch(error => {
        console.error('Failed fetching repositories', error)
        // Invalidate repositories if the fetch fails.
        // This can happen if the application is fetching repos and the network connection drops.
        dispatch(stopRepositoryFetch())
      })
  }
}

const shouldFetch = (state) => {
  let { isFetching, hydrated } = state.repositories
  let { loggedIn } = state.user
  let online = window.navigator.onLine

  if (isFetching || hydrated || !online || !loggedIn) {
    return false
  } else {
    devlog('Starting to fetch repos')
    return true
  }
}

const shouldUpdate = (state) => {
  let { isFetching, hydrated, reposLastUpdated, updateOnProgress } = state.repositories
  let { loggedIn } = state.user
  let online = window.navigator.onLine

  if (updateOnProgress) {
    return false
  }

  if (!online) {
    return false
  }

  let now = Date.now()
  let timePassed = now > reposLastUpdated + REPOSITORY_UPDATE_INTERVAL
  if (isFetching || !hydrated || !timePassed || !loggedIn) {
    return false
  } else {
    devlog('Starting to update repos')
    return true
  }
}

export function fetchRepositoriesIfNotBusy (page = 1) {
  return (dispatch, getState) => {
    if (shouldFetch(getState())) {
      return dispatch(fetchRepositories(getState(), page))
    } else {
      return Promise.resolve()
    }
  }
}

export function updateReposIfNeeded (page = 1) {
  return (dispatch, getState) => {
    if (shouldUpdate(getState())) {
      return dispatch(fetchRepositories(getState(), page))
    } else {
      return Promise.resolve()
    }
  }
}

export function forceReloadRepositories () {
  return (dispatch, getState) => {
    dispatch(invalidateRepos())
    dispatch(fetchRepositoriesIfNotBusy())
  }
}
