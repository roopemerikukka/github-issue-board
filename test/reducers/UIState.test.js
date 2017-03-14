import uiState, { initialState } from '../../src/reducers/UIState'
import * as uiActions from '../../src/actions/UserInterface'

describe('UIState reducer tests', () => {
  test('should return initial state', () => {
    expect(uiState(undefined, {})).toEqual(initialState)
  })

  test('should handle disabling repository', () => {
    const state = {
      disabledRepos: [ 123, 234 ]
    }

    expect(uiState(state, {
      type: uiActions.DISABLE_REPO,
      data: 345
    })).toEqual({
      disabledRepos: [123, 234, 345]
    })
  })

  test('should handle enabling repo', () => {
    const state = {
      disabledRepos: [123, 234, 345]
    }

    expect(uiState(state, {
      type: uiActions.ENABLE_REPO,
      data: 234
    })).toEqual({
      disabledRepos: [123, 345]
    })
  })

  test('should handle toggling autoScroll', () => {
    const state = {
      autoScroll: true
    }

    expect(uiState(state, {
      type: uiActions.TOGGLE_AUTOSCROLL
    })).toEqual({
      autoScroll: false
    })
  })

  test('should invalidate ui', () => {
    const state = {
      autoScroll: true
    }

    expect(uiState(state, {
      type: uiActions.INVALIDATE_UI
    })).toEqual(initialState)
  })
})
