// Components
import HeroFull from '../../../../client/components/template_components/HeroFull'

// Objects
import Button from '../../../../client/objects/Button'
import Image from '../../../../client/objects/Image'

// Fixtures
import heroImageData from '../../../fixtures/heroFull.fixture'

test('renders the full HeroImage component', () => {
  // Arrange
  const emptyFunction = () => {}
  const image = heroImageData.image[0].s3_url
  const mobileImage = heroImageData.mobile_image && heroImageData.mobile_image[0] && heroImageData.mobile_image[0].s3_url
  const linkText = heroImageData.overlay_link_1_text

  // Act
  const wrapper = mount(
    <HeroFull componentData={heroImageData} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toContainReact(<Image className='c-hero__image' src={image} mobileSrc={mobileImage} />)
  expect(wrapper.find('Button')).toMatchElement(<Button className='c-hero__button-icon' label={linkText} status='warning' size='lrg' aria-label={linkText} onClick={emptyFunction} />)
})
