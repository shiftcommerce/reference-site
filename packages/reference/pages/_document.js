// Libraries
import Document, { Head, Main, NextScript } from 'next/document'

// Scripts
import Script from './../utils/Script'
import { configureStore } from '../utils/configureStore'

import { Provider } from 'react-redux'

// CSS
import stylesheet from '../scss/main.scss'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const {html, head, errorHtml, chunks} = renderPage()
    return { html, head, errorHtml, chunks }
  }

  render () {
    let serviceWorker = null
    // Install service worker only in production environment
    if (process.env.NODE_ENV === 'production') {
      serviceWorker = <Script>
        {
          () => {
            // Registration of service worker
            if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
              navigator.serviceWorker.getRegistration('/app').then(registration => {
                // Check if service worker has already registered
                // register only if not yet done
                if (registration === undefined) {
                  navigator.serviceWorker.register('/serviceWorker.js', { scope: '/' }).then(registration => {
                    // Successfully registered the Service Worker
                    console.log('Service Worker registration successful with scope: ', registration.scope)
                  }).catch(err => {
                    // Failed to register the Service Worker
                    console.log('Service Worker registration failed: ', err)
                  })
                }
              })
            } else {
              console.log('Service workers are not supported.')
            }
          }
        }
      </Script>
    }

    const store = configureStore()
    return (
      <html>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <link rel='stylesheet' href='https://unpkg.com/react-instantsearch-theme-algolia@4.0.0/style.min.css' />
        </Head>

        <body>
          <Provider store={store} >
            <div>
              <Main />
              {serviceWorker}
              <NextScript />
            </div>
          </Provider>
        </body>
      </html>
    )
  }
}
