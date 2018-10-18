// Components
import BannerImage from '../../../../client/components/template-components/banner-image'

// Objects
import Image from '../../../../client/objects/image'

// Fixtures
import bannerImageData from '../../../fixtures/banner-image'

test('BannerImage component renders correctly', () => {
  // Arrange & Act
  const wrapper = mount(
    <BannerImage componentData={bannerImageData} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find('Image')).toMatchElement(
    <Image className='c-banner_image' src={bannerImageData.image[0].s3_url} mobileSrc={bannerImageData.mobile_image[0].s3_url} />
  )
})
