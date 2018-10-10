// Libraries
import { Component } from 'react'
import Link from 'next/link'

// Objects
import Button from '../../objects/Button'
import Image from '../../objects/Image'

class HeroFull extends Component {
  heroHeading (hero) {
    // Only render if heading available
    if (hero.heading) {
      return (
        <div className='c-hero__heading'>{hero.heading}</div>
      )
    }
  }

  heroOverlay (hero, currentPosition) {
    let overlayPosition = hero.overlay_position[0] ? hero.overlay_position[0] : 'below'
    if (this.shouldDisplayOverlay(hero, overlayPosition, currentPosition)) {
      return (
        <div className='c-hero__overlay' style={{ backgroundColor: hero.overlay_colour }}>
          {this.overlayPointer(hero.overlay_colour, overlayPosition, 'above')}
          <div className='c-hero__overlay_content'>
            <div className='c-hero__overlay_title'>
              {hero.title}
            </div>
            {hero.text}
            {this.heroButtons(hero)}
          </div>
          {this.overlayPointer(hero.overlay_colour, overlayPosition, 'below')}
        </div>
      )
    }
  }

  shouldDisplayOverlay (hero, overlayPosition, currentPosition) {
    // only render if the current position matches the component position
    const overlayPositionConditional = (overlayPosition === currentPosition)
    // Should display overlay if title, text or a link available
    const overlayDataConditional = (hero.title || hero.text || (hero.link_1_url && hero.link_1_text))

    return overlayPositionConditional && overlayDataConditional
  }

  overlayPointer (colour, overlayPosition, pointerPosition) {
    // only render if the current position matches the component position
    if (overlayPosition !== pointerPosition) {
      let style = {}
      if (pointerPosition === 'below') {
        style['borderTopColor'] = colour
      } else {
        style['borderBottomColor'] = colour
      }
      return <div className={`c-hero__overlay_pointer c-hero__overlay_pointer--${pointerPosition}`} style={style} />
    }
  }

  heroButtons (hero) {
    let buttons = []
    let index = 1

    // Only start looping if first button is there
    if (hero.link_1_url && hero.link_1_text) {
      while (hero[`link_${index}_url`] && hero[`link_${index}_text`]) {
        buttons.push(
          <div className='c-hero__button' key={index}>
            <Link href={`/slug?slug=${hero[`link_${index}_url`][0].canonical_path}`} as={hero[`link_${index}_url`][0].canonical_path}>
              <Button className='c-hero__button-icon' label={hero[`link_${index}_text`]} size='lrg' aria-label={hero[`link_${index}_text`]} />
            </Link>
          </div>
        )
        index++
      }
    }

    return buttons
  }

  render () {
    const { componentData } = this.props

    return (
      <div className='c-hero c-hero--full_with_gutters' style={{ backgroundColor: componentData.background_colour }}>
        {this.heroHeading(componentData)}
        <div className='c-hero__content'>
          {this.heroOverlay(componentData, 'above')}
          <Image className='c-hero__image' src={componentData.image[0].s3_url} />
          {this.heroOverlay(componentData, 'below')}
        </div>
      </div>
    )
  }
}

export default HeroFull
