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

  // Act
  const wrapper = mount(
    <HeroFull componentData={heroImageData} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toContainReact(<Image className='c-hero__image' src={heroImageData.image[0].s3_url} />)
  expect(wrapper.find('Button')).toMatchElement(<Button className='c-hero__button-icon' label={heroImageData.link_1_text} status='warning' size='lrg' aria-label={heroImageData.link1_text} onClick={emptyFunction} />)
})
