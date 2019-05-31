// Libraries
import React, { PureComponent } from 'react'
import t from 'typy'

// Components
import LazyLoad from '../../objects/lazy-load'
import Link from '../../objects/link'

class BannerImage extends PureComponent {
  render () {
    const { componentData, className } = this.props
    const imgSrc = t(componentData, 'image[0].s3_url').safeObject
    const mobileSrc = t(componentData, 'mobile_image[0].s3_url').safeObject
    const href = t(componentData, 'image_link[0].canonical_path').safeObject

    return (
      <Link href={href} as={href} className={className}>
        <LazyLoad className='c-banner-image' src={imgSrc} mobileSrc={mobileSrc} imageHeight={componentData.image_height} imageWidth={componentData.image_width} />
      </Link>
    )
  }
}

export default BannerImage
