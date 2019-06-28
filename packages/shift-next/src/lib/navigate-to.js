import Router from 'next/router'

/**
 * navigate to a location, and scroll to the top
 */
const navigateTo = (url, as = url, opts = {}) => {
  return Router.push(url, as, opts).then(() => window.scrollTo(0, 0))
}

export default navigateTo
