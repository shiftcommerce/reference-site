// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'

// Objects
import Button from '../../objects/Button'
import Image from '../../objects/Image'

export class ThirdCategoryGallery extends Component {
  thirdComponent (thirdData, element) {
    return (
      <div className='c-third'>
        <Image className='c-third__image' src={thirdData[`box${element}_image`][0].s3_url} />
        <h1 className='c-third__title'>{thirdData[`box${element}_title`]}</h1>
        <div className='c-third__text'>
          <p>{thirdData[`box${element}_text`]}</p>
        </div>
        <div className='c-third__button'>
          <Link href={`/slug?slug=${thirdData[`box${element}_link_url`][0].canonical_path}`} as={thirdData[`box${element}_link_url`][0].canonical_path}>
            <Button className='c-third__button-icon' label={thirdData[`box${element}_link_text`]} status='warning' size='lrg' aria-label={thirdData[`box${element}_link_text`]} />
          </Link>
        </div>
      </div>
    )
  }

  render () {
    const { componentData } = this.props
    const elements = [1, 2, 3]

    return (
      <div className='c-third-gallery'>
        { elements.map((element, index) => {
          return (
            <div key={index}>
              {this.thirdComponent(componentData, element)}
            </div>
          )
        }) }
      </div>
    )
  }
}

export default connect()(ThirdCategoryGallery)
