// Libraries
import React, { PureComponent } from 'react'

import Link from './link'
import { Image } from './image'

class Logo extends PureComponent {
  render () {
    const { className, logoSrc } = this.props

    return (
      <div className={className}>
        <Link href='/slug?slug=/homepage' as='/' >
          <Image width={180} height={40} src={logoSrc} />
        </Link>
      </div>
    )
  }
}

export default Logo
