import Head from 'next/head'
import { Component } from 'react'

import stylesheet from '../scss/main.scss'
import searchStylesheet from 'react-instantsearch-theme-algolia/style.scss'

class CustomHead extends Component {
  render () {
    return <Head>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <style dangerouslySetInnerHTML={{ __html: searchStylesheet }} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
    </Head>
  }
}

export default CustomHead
