// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'

// Objects
import Button from '../../objects/Button'
import Image from '../../objects/Image'

export class HeroImage extends Component {
  heroComponent (heroData) {
    return (
      <div className='c-hero'>
        <Image className='c-hero__image' src={heroData.image[0].s3_url} />
        <div className='c-hero__button'>
          <Link href={`/slug?slug=${heroData.link1_url[0].canonical_path}`} as={heroData.link1_url[0].canonical_path}>
            <Button className='c-hero__button-icon' label={heroData.link1_text} status='warning' size='lrg' aria-label={heroData.link1_text} />
          </Link>
        </div>
      </div>
    )
  }
  render () {
    const { hero } = this.props

    return (
      <div>
        {this.heroComponent(hero)}
      </div>
    )
  }
}

export default connect()(HeroImage)
