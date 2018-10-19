// Components
import { HalfCategoryGallery } from '../../../../client/components/template-components/half-category-gallery'

// Objects
import Button from '../../../../client/objects/button'
import Image from '../../../../client/objects/image'

// Fixtures
import halfCategoryData from '../../../fixtures/half-category-gallery'

test('renders the full HalfCategoryGallery component', () => {
  // Arrange
  const emptyFunction = () => {}

  // Act
  const wrapper = mount(
    <HalfCategoryGallery componentData={halfCategoryData} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText(halfCategoryData.box1_title)
  expect(wrapper).toIncludeText(halfCategoryData.box2_title)
  expect(wrapper).toContainReact(<Image className='c-half__image' src={halfCategoryData.box1_image[0].s3_url} />)
  expect(wrapper).toContainReact(<Image className='c-half__image' src={halfCategoryData.box2_image[0].s3_url} />)
  expect(wrapper.find('Button').at(0)).toMatchElement(<Button className='c-half__button-icon' label={halfCategoryData.box1_link_text} status='warning' size='lrg' aria-label={halfCategoryData.box1_link_text} onClick={emptyFunction} />)
  expect(wrapper.find('Button').at(1)).toMatchElement(<Button className='c-half__button-icon' label={halfCategoryData.box2_link_text} status='warning' size='lrg' aria-label={halfCategoryData.box2_link_text} onClick={emptyFunction} />)
})