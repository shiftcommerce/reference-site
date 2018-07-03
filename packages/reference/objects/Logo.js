// Libraries
import { Component } from 'react'
import Link from 'next/link'

// Objects
import Image from '../objects/Image'

class Logo extends Component {
  render () {
    let { className } = this.props
    let logoSrc = '/static/logo.svg'

    return (
      <div className={className}>
        <Link href='/'>
          <a>
            <Image width={120} height={75} src={logoSrc} />
          </a>
        </Link>
      </div>
    )
  }
}

export default Logo
