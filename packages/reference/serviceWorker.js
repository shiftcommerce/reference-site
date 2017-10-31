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
    .catch((error) => {
      console.log('Seems there is an error while registering service worker..')
      console.log(error)
    })
  )
})

// This 'fetch' will be triggered for every request made from the browser
// Firstly, it will check if that requested url is available in cache we requested
// if yes, it will be returned. if not, then a request will be made to server
// and the response along with url will added to service worker cache.
self.addEventListener('fetch', event => {
  const request = event.request
  const url = new URL(event.request.url)

  // IMPORTANT: Clone the request. A request is a stream and
  // can only be consumed once. Since we are consuming this
  // once by cache and once by the browser for fetch, we need
  // to clone the response.
  let fetchRequest = event.request.clone()

  // don't cache anything that is not on this origin
  if (url.origin !== location.origin) return

  // don't cache anything that's a data URL
  if (url.protocol === 'data:') return

  // don't cache non-idempotent requests
  // Exception case for algolia
  if (ALLOWEDREQUESTS.includes(fetchRequest.method) === false) return {}

  event.respondWith(
    caches.match(fetchRequest)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response
        }

        return fetch(request)
        .then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }

          // IMPORTANT: Clone the response. A response is a stream
          // and because we want the browser to consume the response
          // as well as the cache consuming the response, we need
          // to clone it so we have two streams.
          let responseToCache = response.clone()
          caches.open(CACHENAME)
            .then((cache) => {
              cache.put(fetchRequest, responseToCache)
            })
          return response
        }
        ).catch(() => {
          // Respond only if they are not algolia or stripe requests
          if (!fetchRequest.url.match(/algolia|stripe/)) {
            // This is to handle the next urls.
            // Next urls will be like /_next/id/page/page_name
            // which we want as just /page_name, in case of offline
            let page = fetchRequest.url.match(/page([/a-z0-9_]*)/)
            if (page.match(/home/)) {
              fetchRequest.mode = 'navigate'
              return caches.match('/')
            }

            caches.match(page[1])
              .then(response => {
                if (response !== undefined) {
                  return response
                }
              })
              .catch(() => {
                fetchRequest.mode = 'navigate'
                return caches.match('/offline')
              })
          }
        })
      })
      .catch(() => {
        fetchRequest.mode = 'navigate'
        return caches.match('/offline')
      })
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
