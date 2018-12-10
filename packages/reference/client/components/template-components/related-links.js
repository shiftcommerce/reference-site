// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'

// Objects
import Button from '../../objects/button'

export class RelatedLinks extends Component {
  styles () {
    const { componentData: { image_height, image_width } } = this.props

    return {
      height: image_height,
      width: image_width
    }
  }

  linkButton (linkData, element) {
    return (
      <div className='c-links__grid-button'>
        <Link href={`/slug?slug=${linkData[`link${element}_url`][0].canonical_path}`} as={linkData[`link${element}_url`][0].canonical_path}>
          <Button className='c-links__grid-button-icon' label={linkData[`link${element}_text`]} status='warning' size='lrg' aria-label={linkData[`link${element}_text`]} />
        </Link>
      </div>
    )
  }

  render () {
    const { componentData } = this.props
    const elements = [1, 2, 3]

    return (
      <div className='c-links' style={this.styles()}>
        <div className='c-links__text'>
          <h1 className='c-links__text-title'>
            { componentData.title }
          </h1>
        </div>
        <div className='c-links__grid'>
          { elements.map((element, index) => {
            if (componentData[`link${element}_url`]) {
              return (
                <div key={index}>
                  { this.linkButton(componentData, element) }
                </div>
              )
            }
          }) }
        </div>
      </div>
    )
  }
}

export default connect()(RelatedLinks)
