// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'

// Objects
import Button from '../../objects/Button'
import Image from '../../objects/Image'

export class HalfCategoryGallery extends Component {
  halfComponent (halfData, element) {
    return (
      <div className='c-half'>
        <Image className='c-half__image' src={halfData[`box${element}_image`][0].s3_url} />
        <div className='c-half__text'>
          <h1>{ halfData[`box${element}_title`] }</h1>
        </div>
        <div className='c-half__button'>
          <Link href={`/slug?slug=${halfData[`box${element}_link_url`][0].canonical_path}`} as={halfData[`box${element}_link_url`][0].canonical_path}>
            <Button className='c-half__button-icon' label={halfData[`box${element}_link_text`]} status='warning' size='lrg' aria-label={halfData[`box${element}_link_text`]} />
          </Link>
        </div>
      </div>
    )
  }

  render () {
    const { componentData } = this.props
    const elements = [1, 2]

    return (
      <div className='c-half-gallery'>
        { elements.map((element, index) => {
          return (
            <div key={index}>
              { this.halfComponent(componentData, element) }
            </div>
          )
        }) }
      </div>
    )
  }
}

export default connect()(HalfCategoryGallery)
