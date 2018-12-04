// Libraries
import t from 'typy'

// Components
import HeroFull from '../../../../client/components/template-components/hero-full'

// Objects
import Image from '../../../../client/objects/image'

// Fixtures
import heroImageData from '../../../fixtures/hero-full'

test('renders the full HeroImage component', () => {
  // Arrange
  const imgSrc = t(heroImageData, 'image[0].s3_url').safeObject
  const mobileSrc = t(heroImageData, 'mobile_image[0].s3_url').safeObject

  // Act
  const wrapper = mount(
    <HeroFull componentData={heroImageData} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toContainReact(<Image className='c-hero__image' src={imgSrc} mobileSrc={mobileSrc} />)
})
