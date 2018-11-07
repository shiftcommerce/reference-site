// Components
import HeroFull from '../../../../client/components/template-components/hero-full'

// Objects
import Image from '../../../../client/objects/image'

// Fixtures
import heroImageData from '../../../fixtures/hero-full'

test('renders the full HeroImage component', () => {
  // Arrange
  const image = heroImageData.image[0].s3_url
  const mobileImage = heroImageData.mobile_image && heroImageData.mobile_image[0] && heroImageData.mobile_image[0].s3_url

  // Act
  const wrapper = mount(
    <HeroFull componentData={heroImageData} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toContainReact(<Image className='c-hero__image' src={image} mobileSrc={mobileImage} />)
})
