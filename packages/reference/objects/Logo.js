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
        <Link href='/home/index' as='/'>
          <a>
            <Image width={72} height={79} src={logoSrc} />
          </a>
        </Link>
      </div>
    )
  }
}

export default Logo
