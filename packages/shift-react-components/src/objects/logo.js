// Libraries
import React, { PureComponent } from 'react'

import { Image } from './image'
import Config from '../lib/config'
import link from './link'

class Logo extends PureComponent {
  render () {
    const Link = Config.get().Link || link
    const { className, logoSrc } = this.props

    return (
      <div className={className}>
        <Link href='/slug?slug=/homepage' as='/'>
          <Image width={180} height={40} src={logoSrc} />
        </Link>
      </div>
    )
  }
}

export default Logo
