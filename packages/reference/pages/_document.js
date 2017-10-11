// Libraries
import Document, { Main, NextScript } from 'next/document'

// Scripts
import { configureStore } from '../utils/configureStore'

import { Provider } from 'react-redux'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const {html, head, errorHtml, chunks} = renderPage()
    return { html, head, errorHtml, chunks }
  }

  render () {
    const store = configureStore()
    return (
      <html>
        <body>
          <Provider store={store} >
            <div>
              <Main />
              <NextScript />
            </div>
          </Provider>
        </body>
      </html>
    )
  }
}
