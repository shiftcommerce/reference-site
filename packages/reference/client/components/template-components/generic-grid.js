// Libraries
import { PureComponent } from 'react'
import Link from 'next/link'

// Objects
import Button from '../../objects/button'
import Image from '../../objects/image'

class GenericGrid extends PureComponent {
  buildSlides (componentData) {
    const slides = []

    for (let i of [...Array(12).keys()]) {
      const slideImage = componentData[`slide${i + 1}_image`]
      const slideText = componentData[`slide${i + 1}_text`]
      const slideLinkURL = componentData[`slide${i + 1}_url`]

      if (slideImage && slideText && slideLinkURL) {
        slides.push(
          <div className="o-card-grid__card" key={i}>
            <Link href={slideLinkURL[0].canonical_path}>
              <a>
                <Image className='u-image-shadow' src={slideImage[0].canonical_path} />
                <p className="o-card-grid__title">{ slideText }</p>
              </a>
            </Link>
          </div>
        )
      }
    }
    return slides
  }

  catButton (componentData) {
    return (
      <Link href={componentData.cat_url[0].canonical_path}>
        <a>
          <Button
            className="c-template-component__cat-button"
            label={componentData.cat_text}
            status="primary"
          />
        </a>
      </Link>
    )
  }

  render () {
    const { componentData } = this.props

    return (
      <section className="o-template-component u-center-align">
        <h1 className="c-component-header">{ componentData.header }</h1>
        <div className="o-card-grid o-card-grid--3d-3m">
          { this.buildSlides(componentData) }
        </div>
        { componentData.cat_url[0] && componentData.cat_text && this.catButton(componentData) }
      </section>
    )
  }
}

export default GenericGrid
