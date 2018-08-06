// Components
import { HeroImage } from '../../../components/pages/HeroImage'

// Objects
import Button from '../../../objects/Button'
import Image from '../../../objects/Image'

// Fixtures
import heroImageData from '../../fixtures/heroImage.fixture'

test('renders the full HeroImage component', () => {
  // Arrange
  const emptyFunction = () => {}

  // Act
  const wrapper = mount(
    <HeroImage hero={heroImageData} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toContainReact(<Image className='c-hero__image' src={heroImageData.image[0].s3_url} />)
  expect(wrapper.find('Button')).toMatchElement(<Button className='c-hero__button-icon' label={heroImageData.link1_text} status='warning' size='lrg' aria-label={heroImageData.link1_text} onClick={emptyFunction} />)
})
