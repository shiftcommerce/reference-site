// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'

// Next config
import getConfig from 'next/config'

const { publicRuntimeConfig: { PAYPAL_CLIENT_ID } } = getConfig()

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)

    return { ...initialProps }
  }

  render () {
    const payPalClientID = PAYPAL_CLIENT_ID

    return (
      <Html>
        <Head>
          <script src='https://js.stripe.com/v3/' key='stripe' />
          { payPalClientID && <script src={`https://www.paypal.com/sdk/js?client-id=${payPalClientID}&currency=GBP&intent=authorize&commit=false&disable-funding=credit,sepa,card`} /> }
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
