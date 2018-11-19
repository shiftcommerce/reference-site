import Head from 'next/head'
import { Component } from 'react'

class CustomHead extends Component {
  render () {
    return <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <script src='https://js.stripe.com/v3/' />
      <link rel='icon' type='image/png' sizes='32x32' href='/static/favicon.png' />
    </Head>
  }
}

export default CustomHead
