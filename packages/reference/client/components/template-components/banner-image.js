// Libraries
import { PureComponent } from 'react'
import Link from 'next/link'

// Objects
import Image from '../../objects/image'

export class BannerImage extends PureComponent {
  render () {
    const { componentData } = this.props
    const image = componentData.image && componentData.image[0] && componentData.image[0].s3_url
    const mobileImage = componentData.mobile_image && componentData.mobile_image[0] && componentData.mobile_image[0].s3_url
    const imageLink = componentData.image_link && componentData.image_link[0] && componentData.image_link[0].canonical_path

    return (
      <Link href={imageLink} as={imageLink}>
        <a>
          <Image className='c-banner-image' src={image} mobileSrc={mobileImage} />
        </a>
      </Link>
    )
  }
}

export default BannerImage
