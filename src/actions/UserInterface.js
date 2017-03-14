export const ENABLE_REPO = 'ENABLE_REPO'
export const DISABLE_REPO = 'DISABLE_REPO'
export const INVALIDATE_UI = 'INVALIDATE_UI'
export const TOGGLE_AUTOSCROLL = 'TOGGLE_AUTOSCROLL'

export const enableRepository = (repoId) => {
  return {
    type: ENABLE_REPO,
    data: repoId
  }
}

export const disableRepository = (repoId) => {
  return {
    type: DISABLE_REPO,
    data: repoId
  }
}

export const invalidateUIState = () => {
  return {
    type: INVALIDATE_UI
  }
}

export const toggleAutoScroll = () => {
  return {
    type: TOGGLE_AUTOSCROLL
  }
}
