import { checkStatus } from '../src/helpers'

describe('checkStatus', () => {
  it('should throw error on bad status code', () => {
    const response = {
      status: 404,
      statusText: 'Error 404'
    }
    expect(() => checkStatus(response)).toThrow()
  })

  it('should return the response on 200', () => {
    const response = {
      status: 200
    }
    expect(checkStatus(response)).toBe(response)
  })
})
