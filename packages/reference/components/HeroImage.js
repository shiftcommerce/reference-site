// Libraries
import { Component } from 'react'
import Link from 'next/link'

// Object
import Image from '../objects/Image'

class HeroImage extends Component {
  render () {
    let {
      heroUrl,
      heroImage,
      title,
      message,
      linkUrl,
      linkText
    } = this.props

    return (
      <div style={{ 'textAlign': 'center' }} >
        <div style={{ margin: '0 auto' }}>
          <Link href={heroUrl} >
            <a>
              <Image src={heroImage} width='90%' height={450} />
            </a>
          </Link>
        </div>

        <div className='c-title' >
          {title}
        </div>

        <div>
          {message}
        </div>

        <Link href={linkUrl} >
          <a className='o-button o-button--lrg'>
            {linkText}
          </a>
        </Link>
      </div>
    )
  }
}

export default HeroImage
