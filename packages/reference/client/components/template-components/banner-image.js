// Libraries
import { PureComponent } from 'react'
import Link from 'next/link'
import t from 'typy'

// Objects
import { LazyLoad } from 'shift-react-components'

export class BannerImage extends PureComponent {
  render () {
    const { componentData } = this.props
    const imgSrc = t(componentData, 'image[0].s3_url').safeObject
    const mobileSrc = t(componentData, 'mobile_image[0].s3_url').safeObject
    const href = t(componentData, 'image_link[0].canonical_path').safeObject

    return (
      <Link href={href} as={href}>
        <a>
          <LazyLoad className='c-banner-image' src={imgSrc} mobileSrc={mobileSrc} imageHeight={componentData.image_height} imageWidth={componentData.image_width} />
        </a>
      </Link>
    )
  }
}

export default BannerImage
