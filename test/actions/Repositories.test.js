import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../src/actions/Repositories'
import * as helpers from '../../src/helpers'
import nock from 'nock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const mockRepos = [
  {
    id: 123,
    name: 'repo-name',
    full_name: 'owner/repo-name',
    owner: 'owner',
    private: false,
    html_url: '',
    description: '',
    url: '',
    created_at: '',
    updated_at: '',
    pushed_at: '',
    stargazers_count: 1,
    watchers_count: 1,
    language: '',
    has_issues: true,
    open_issues_count: 1,
    open_issues: 1,
    watchers: 1,
    default_branch: 'master',
    permissions: '',
    issues: [{}]
  }
]

describe('Repositories actions', () => {
  beforeEach(() => {
    helpers.parseLinkHeader = jest.fn()
      .mockImplementation(() => {
        return {
          'someLink': 'nothing'
        }
      })
  })

  afterEach(() => {
    nock.cleanAll()
  })

  test('Should create action to invalidate repos', () => {
    const expectedAction = {
      type: actions.INVALIDATE_REPOS
    }

    expect(actions.invalidateRepos()).toEqual(expectedAction)
  })

  test('Should continue fetching is update is on progress', () => {
    // Mock the repo fetch
    nock(`https://api.github.com`)
      .defaultReplyHeaders({
        'Link': ''
      })
      .get(`/user/repos?access_token=abc&page=2`)
      .reply(200, mockRepos)

    // Mock the issue fetch
    nock(`https://api.github.com`)
      .get(`/repos/${mockRepos[0].full_name}/issues?access_token=abc`)
      .reply(200, [{}])

    const store = mockStore({
      repositories: {
        isFetching: false,
        updateOnProgress: true
      },
      uistate: {
        online: true
      },
      user: {
        accessToken: 'abc'
      }
    })

    return store.dispatch(actions.fetchRepositoriesIfNotBusy(2))
      .then(() => {
        console.log(store.getActions())
      })
  })

  test('receives repositories if should fetch', () => {
    // Mock the repo fetch
    nock(`https://api.github.com`)
      .defaultReplyHeaders({
        'Link': ''
      })
      .get(`/user/repos?access_token=abc&page=1`)
      .reply(200, mockRepos)

    // Mock the issue fetch
    nock(`https://api.github.com`)
      .get(`/repos/${mockRepos[0].full_name}/issues?access_token=abc`)
      .reply(200, [{}])

    const store = mockStore({
      repositories: {
        isFetching: false,
        updateOnProgress: false
      },
      uistate: {
        online: true
      },
      user: {
        accessToken: 'abc'
      }
    })

    const expectedActions = [
      { type: actions.REQUEST_REPOSITORIES },
      { type: actions.RECEIVE_REPOSITORIES, data: mockRepos }
    ]

    return store.dispatch(actions.fetchRepositoriesIfNotBusy())
      .then(() => {
        const receivedActions = store.getActions()
        const receivedRepos = receivedActions[1].data
        expect(receivedActions).toEqual(expect.arrayContaining(expectedActions))
        expect(receivedRepos).toEqual(mockRepos)
      })
  })
})
