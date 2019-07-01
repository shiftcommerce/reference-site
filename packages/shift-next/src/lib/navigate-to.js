import Router from 'next/router'

/**
 * navigate to a location, and scroll to the top
 */
const navigateTo = (url, as = url, opts = {}) => {
  const go = Router.push(url, as, opts)

  if (global && global.scrollTo) {
    return go.then(() => global.scrollTo(0, 0))
  } else {
    return go
  }
}

export default navigateTo
