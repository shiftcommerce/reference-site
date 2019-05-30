// Libraries
import React, { PureComponent } from 'react'
import componentMapping from '../lib/component-mapping'

class Logo extends PureComponent {
  constructor (props) {
    super(props)

    this.Image = componentMapping('Image')
    this.Link = componentMapping('Link')
  }
  render () {
    const { className, logoSrc } = this.props

    return (
      <div className={className}>
        <this.Link href='/slug?slug=/homepage' as='/' >
          <this.Image width={180} height={40} src={logoSrc} />
        </this.Link>
      </div>
    )
  }
}

export default Logo
