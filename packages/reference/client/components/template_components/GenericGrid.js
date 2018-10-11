// Libraries
import { Component } from 'react'
import Link from 'next/link'

// Objects
import Button from '../../objects/Button'
import Image from '../../objects/Image'

class GenericGrid extends Component {
  buildSlides (component) {
    const slides = []

    for (let i of [...Array(12).keys()]) {
      const slideImage = component[`slide${i + 1}_image`]
      const slideText = component[`slide${i + 1}_text`]
      const slideLinkURL = component[`slide${i + 1}_url`]

      if (slideImage && slideText && slideLinkURL) {
        slides.push(
          <div className="c-generic-grid__card" key={i}>
            <Link href={slideLinkURL[0].canonical_path}>
              <a>
                <Image src={slideImage[0].canonical_path} />
                <p className="c-generic-grid__title">{slideText}</p>
              </a>
            </Link>
          </div>
        )
      }
    }

    return slides
  }

  render () {
    const { component } = this.props

    return (
      <section className="c-generic-grid">
        <h1 className="c-component-header">{component.header}</h1>
        <div className="c-generic-grid__container">
          {this.buildSlides(component)}
        </div>
        <Button
          className="c-generic-grid__cat-button"
          label={component.cat_text}
          status="primary"
        />
      </section>
    )
  }
}

export default GenericGrid
