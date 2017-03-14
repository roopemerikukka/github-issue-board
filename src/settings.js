/**
 * Settings.
 */
import packagejson from '../package.json'
const packageSettings = packagejson['github-issue-board']

export const LOCAL_STORAGE_KEY = packageSettings['local-storage-key'] || 'github-issue-board-store'

const CLIENT_ID = process.env.REACT_APP_CLIEND_ID

export const REPOSITORY_UPDATE_INTERVAL = 300000 // 5min
// export const REPOSITORY_UPDATE_INTERVAL = 60000 // 1min

export function getClientId () {
  return CLIENT_ID
}

export const SECRET_KEEPER_URL = packageSettings['secret-keeper-url'] || 'https://roope-secrets.herokuapp.com'
