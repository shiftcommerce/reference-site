const CACHENAME = 'shift-front-end-react:0001'
const CACHEFILES = [
  '/',
  '/offline'
]
const ALLOWEDREQUESTS = ['GET', 'HEAD', 'OPTIONS']

// This 'install' action will perform initial cache actions.
// Upon installing worker, it will cache the pages which we whitelisted
// above in 'CACHEFILES'

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHENAME)
    .then(cache => cache.addAll(CACHEFILES))
  )
})

// This 'fetch' will be triggered for every request made from the browser
// Firstly, it will check if that requested url is available in cache we requested
// if yes, it will be returned. if not, then a request will be made to server
// and the response along with url will added to service worker cache.

self.addEventListener('fetch', event => {
  const request = event.request
  const url = new URL(event.request.url)

  // don't cache anything that is not on this origin
  if (url.origin !== location.origin) return

  // don't cache anything that's a data URL
  if (url.protocol === 'data:') return

  // don't cache non-idempotent requests
  if (ALLOWEDREQUESTS.includes(request.method) === false) return

  event.respondWith(
    caches.open(CACHENAME)
    .then(cache => cache.match(request)
      .then(response => {
        let fetchPromise = fetch(request)
          .then(networkResponse => {
            // add missing urls to the worker cache.
            cache.put(request, networkResponse.clone())
            return networkResponse
          })

        // we need to ensure that the event doesn't complete until we know we
        // have fetched the data
        event.waitUntil(fetchPromise)

        // return the response from cache or wait for network
        return response || fetchPromise
      })
      .catch(() =>
        // return a default offline page, for the pages which are not cached for offline
        caches.match('/offline')
      ))
  )
})

// Delete caches which are stale (previous versions)
// This function will be taking care of maintaining cache version of worker.
// When a new version is available, it will delete the old ones.

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHENAME]

  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName => {
        // Delete stale cache
        if (!cacheWhitelist.includes(cacheName)) {
          return caches.delete(cacheName)
        }
      })
    ))
  )
})
