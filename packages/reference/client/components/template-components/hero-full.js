// Libraries
import { Component } from 'react'
import Link from 'next/link'
import classNames from 'classnames'

// Objects
import ConditionalLink from '../../objects/conditional-link'
import Image from '../../objects/image'

class HeroFull extends Component {
  heroHeading (hero) {
    // Only render heading if available
    if (hero.heading) {
      return (
        <h1 className='c-component-header u-margin-top-none-des'>{ hero.heading }</h1>
      )
    }
  }

  heroOverlay (hero, currentPosition) {
    let overlayPosition = hero.overlay_position ? hero.overlay_position[0] : 'below'

    if (this.shouldDisplayOverlay(hero, overlayPosition, currentPosition)) {
      let overlayStyles = { color: hero.overlay_text_colour, backgroundColor: hero.overlay_background_colour }
      let overlayClasses = `c-hero__overlay c-hero__overlay--overlap_${overlayPosition}_${hero.overlay_image_overlap} c-hero__overlay--offset_${overlayPosition}_${hero.overlay_image_overlap}_${this.overlaySize(hero)}`

      return (
        <div className={overlayClasses} style={overlayStyles}>
          { this.overlayPointer(hero.overlay_background_colour, overlayPosition, 'above') }
          <div className='c-hero__overlay_content'>
            { hero.overlay_title && <div className='c-hero__overlay_title'>{ hero.overlay_title }</div> }
            { hero.overlay_text && (<div className='u-whitespace_preline'>{ hero.overlay_text }</div>) }
            { this.heroButtons(hero) }
          </div>
          { this.overlayPointer(hero.overlay_background_colour, overlayPosition, 'below') }
        </div>
      )
    }
  }

  overlaySize (hero) {
    let count = 0
    if (hero.overlay_title) { count += 2 }
    if (hero.overlay_text) { count++ }
    if (hero.overlay_link_1_url && hero.overlay_link_1_text) { count++ }
    return count
  }

  shouldDisplayOverlay (hero, overlayPosition, currentPosition) {
    // only render if the current position matches the component position
    const overlayPositionConditional = (overlayPosition === currentPosition)
    // Should display overlay if title, text or a link available
    const overlayDataConditional = this.overlaySize(hero) > 0

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
      return (
        <div className={`c-hero__overlay_pointer c-hero__overlay_pointer--${pointerPosition}`} style={style} />
      )
    }
  }

  heroButtons (hero) {
    let buttons = []
    let index = 1

    // Only start looping if first button is there
    if (hero.overlay_link_1_url && hero.overlay_link_1_text) {
      while (hero[`overlay_link_${index}_url`] && hero[`overlay_link_${index}_text`]) {
        const url = hero[`overlay_link_${index}_url`][0].canonical_path

        buttons.push(
          <div className='c-hero__button' key={index}>
            <Link href={`/slug?slug=${url}`} as={url}>
              <a className='c-hero__button-icon'>{ hero[`overlay_link_${index}_text`] }</a>
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
    const href = componentData['overlay_link_1_url'] && componentData['overlay_link_1_url'][0].canonical_path
    const imgSrc = componentData.image && componentData.image[0] && componentData.image[0].s3_url
    const mobileSrc = componentData.mobile_image && componentData.mobile_image[0] && componentData.mobile_image[0].s3_url
    const componentClasses = classNames('o-template-component o-template-component--full-width c-hero', {
      'u-padding-top-des': !!componentData.background_colour
    })

    return (
      <section className={componentClasses} style={{ backgroundColor: componentData.background_colour }}>
        { this.heroHeading(componentData) }
        <div className='c-hero__content'>
          { this.heroOverlay(componentData, 'above') }
          <ConditionalLink href={href}>
            <Image className='c-hero__image' src={imgSrc} mobileSrc={mobileSrc} />
          </ConditionalLink>
          { this.heroOverlay(componentData, 'below') }
        </div>
      </section>
    )
  }
}

export default HeroFull
