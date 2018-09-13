import Document, { Head, Main, NextScript } from 'next/document'

// Stylesheet
import '../styles.scss'

export default class MyDocument extends Document {
  render () {
    return (
      <html>
        <Head>
          <link rel='stylesheet' href='/_next/static/styles.css' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
