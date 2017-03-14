import * as actions from '../../src/actions/UserInterface'

describe('UserInterface actions', () => {
  test('should create action to enable repository', () => {
    const expectedAction = {
      type: actions.ENABLE_REPO,
      data: 2
    }
    expect(actions.enableRepository(2)).toEqual(expectedAction)
  })

  test('should create action to disable repository', () => {
    const expectedAction = {
      type: actions.DISABLE_REPO,
      data: 3
    }
    expect(actions.disableRepository(3)).toEqual(expectedAction)
  })

  test('should create action to invalidate UI', () => {
    const expectedAction = {
      type: actions.INVALIDATE_UI
    }
    expect(actions.invalidateUIState()).toEqual(expectedAction)
  })

  test('should create action to toggle autoscroll', () => {
    const expectedAction = {
      type: actions.TOGGLE_AUTOSCROLL
    }
    expect(actions.toggleAutoScroll()).toEqual(expectedAction)
  })
})
