// Libraries
import React, { Component } from 'react'

import link from './link'
import Config from '../lib/config'
const Link = Config.get().Link || link

// This object conditionally wraps children in a link if
// the passed URL is present
export class ConditionalLink extends Component {
  render () {
    const { href, children, className } = this.props

    if (href) {
      return (
        <Link href={`/slug?slug=${href}`} as={href} className={className}>
          { children }
        </Link>
      )
    } else {
      return children
    }
  }
}
