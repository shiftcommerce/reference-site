// Libraries
import { Component } from 'react'
import Link from 'next/link'

// Objects
import Image from '../objects/Image'

class Logo extends Component {
  render () {
    let { className } = this.props
    let logoSrc = '/static/shopgo-logo.svg'

    return (
      <div className={className}>
        <Link href='/slug?slug=/homepage' as='/' >
          <a>
            <Image width={120} height={30} src={logoSrc} className='o-logo__image' />
          </a>
        </Link>
      </div>
    )
  }
}

export default Logo
