export function isSecure () {
  return window && window.location && window.location.protocol === 'https:'
}
