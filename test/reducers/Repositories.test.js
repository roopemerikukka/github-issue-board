import repositories, { initialState } from '../../src/reducers/Repositories'
import * as repoActions from '../../src/actions/Repositories'

const testRepo1 = {
  'name': 'testrepo1'
}

const testRepo2 = {
  'name': 'testrepo2'
}

const testRepo3 = {
  'name': 'testrepo3'
}

describe('Repositories reducer tests', () => {
  test('should return initial state', () => {
    expect(repositories(undefined, {})).toEqual(initialState)
  })

  test('should handle requesting repositories', () => {
    const state = {
      isFetching: false,
      updateOnProgress: false
    }

    expect(repositories(state, {
      type: repoActions.REQUEST_REPOSITORIES
    })).toEqual({
      isFetching: true,
      updateOnProgress: true
    })
  })

  test('should handle receiving repositories', () => {
    const state = {
      isFetching: true,
      data: [testRepo1],
      tempData: [testRepo2]
    }

    expect(repositories(state, {
      type: repoActions.RECEIVE_REPOSITORIES,
      data: [testRepo3]
    })).toEqual({
      isFetching: false,
      data: [testRepo1],
      tempData: [testRepo2, testRepo3]
    })
  })

  test('shouls handle receiving all repos', () => {
    const state = {
      hydrated: false,
      updateOnProgress: true,
      reposLastUpdated: -1,
      data: [testRepo1],
      tempData: [testRepo2, testRepo3]
    }

    expect(repositories(state, {
      type: repoActions.RECEIVED_ALL_REPOS,
      data: 123123
    })).toEqual({
      hydrated: true,
      updateOnProgress: false,
      reposLastUpdated: 123123,
      data: [testRepo2, testRepo3],
      tempData: []
    })
  })

  test('should return initial state on data invalidation', () => {
    const state = {
      isFetching: true
    }

    expect(repositories(state, {
      type: repoActions.INVALIDATE_REPOS
    })).toEqual(initialState)
  })
})
