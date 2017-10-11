import Head from 'next/head'
import { Component } from 'react'

import stylesheet from '../scss/main.scss'

class CustomHead extends Component {
  render () {
    return <Head>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
    </Head>
  }
}

export default CustomHead
