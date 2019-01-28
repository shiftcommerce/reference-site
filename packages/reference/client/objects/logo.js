// Libraries
import { PureComponent } from 'react'
import Link from 'next/link'

// Objects
import { Image } from 'shift-react-components'

class Logo extends PureComponent {
  render () {
    let { className } = this.props
    let logoSrc = '/static/shopgo-logo.svg'

    return (
      <div className={className}>
        <Link href='/slug?slug=/homepage' as='/' >
          <a>
            <Image width={180} height={40} src={logoSrc} className='o-logo__image' />
          </a>
        </Link>
      </div>
    )
  }
}

export default Logo
