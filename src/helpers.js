/**
 * Helper functions
 */

// Function to check status codes from fetch responses.
export function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    let error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

// Throttling function.
export function throttle (fn, threshhold, scope) {
  threshhold || (threshhold = 250)
  var last
  var deferTimer
  return function () {
    var context = scope || this

    var now = +new Date()
    var args = arguments
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer)
      deferTimer = setTimeout(function () {
        last = now
        fn.apply(context, args)
      }, threshhold)
    } else {
      last = now
      fn.apply(context, args)
    }
  }
}

// Function to parse Link headers.
export function parseLinkHeader (linkHeader) {
  if (linkHeader.length === 0) {
    throw new Error('Link header must not be zero length.')
  }

  // Split parts by comma.
  let parts = linkHeader.split(',')
  let links = {}
  parts.forEach(part => {
    let section = part.split(';')
    if (section.length !== 2) {
      throw new Error('section could not be splitted on ";"')
    }
    let url = section[0].replace(/<(.*)>/, '$1').trim()
    let name = section[1].replace(/rel="(.*)"/, '$1').trim()
    links[name] = url
  })
  return links
}

export function loadFonts () {
  let WebFont = require('webfontloader')
  WebFont.load({
    typekit: {
      id: 'lsk3equ'
    }
  })
}
