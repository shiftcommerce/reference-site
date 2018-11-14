// Libraries
import { Component } from 'react'
import Link from 'next/link'

// This object conditionally wraps children in a link if
// the passed URL is present
export default class ConditionalLink extends Component {
  render () {
    const { href, children } = this.props

    if (href) {
      return (
        <Link href={`/slug?slug=${href}`} as={href}>
          <a>
            { children }
          </a>
        </Link>
      )
    } else {
      return children
    }
  }
}
