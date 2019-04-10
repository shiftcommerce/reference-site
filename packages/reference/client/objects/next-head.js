import Head from 'next/head'

// Next config
import getConfig from 'next/config'

const {
  publicRuntimeConfig: {
    PAYPAL_CLIENT_ID
  }
} = getConfig()

export default (props) => {
  const { children } = props
  const payPalClientID = PAYPAL_CLIENT_ID

  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1.0' />
      <link rel='icon' type='image/png' sizes='32x32' href='../../static/favicon.png' key='favicon' />
      <script src='https://js.stripe.com/v3/' key='stripe' />
      { payPalClientID && <script src={`https://www.paypal.com/sdk/js?client-id=${payPalClientID}&currency=GBP&intent=authorize&commit=false&disable-funding=credit,sepa&disable-card=amex,visa,mastercard,discover,jcb,elo,hiper`} /> }
      { children }
    </Head>
  )
}
