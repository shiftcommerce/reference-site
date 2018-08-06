// Components
import { ThirdCategoryGallery } from '../../../components/pages/ThirdCategoryGallery'

// Objects
import Button from '../../../objects/Button'
import Image from '../../../objects/Image'

// Fixtures
import thirdCategoryData from '../../fixtures/thirdCategoryGallery.fixture'

test('renders the full ThirdCategoryGallery component', () => {
  // Arrange
  const emptyFunction = () => {}

  // Act
  const wrapper = mount(
    <ThirdCategoryGallery third={thirdCategoryData} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText(thirdCategoryData.box1_title)
  expect(wrapper).toIncludeText(thirdCategoryData.box2_title)
  expect(wrapper).toIncludeText(thirdCategoryData.box3_title)
  expect(wrapper).toIncludeText(thirdCategoryData.box1_text)
  expect(wrapper).toIncludeText(thirdCategoryData.box2_text)
  expect(wrapper).toIncludeText(thirdCategoryData.box3_text)
  expect(wrapper).toContainReact(<Image className='c-third__image' src={thirdCategoryData.box1_image[0].s3_url} />)
  expect(wrapper).toContainReact(<Image className='c-third__image' src={thirdCategoryData.box2_image[0].s3_url} />)
  expect(wrapper).toContainReact(<Image className='c-third__image' src={thirdCategoryData.box3_image[0].s3_url} />)
  expect(wrapper.find('Button').at(0)).toMatchElement(<Button className='c-third__button-icon' label={thirdCategoryData.box1_link_text} status='warning' size='lrg' aria-label={thirdCategoryData.box1_link_text} onClick={emptyFunction} />)
  expect(wrapper.find('Button').at(1)).toMatchElement(<Button className='c-third__button-icon' label={thirdCategoryData.box2_link_text} status='warning' size='lrg' aria-label={thirdCategoryData.box2_link_text} onClick={emptyFunction} />)
  expect(wrapper.find('Button').at(2)).toMatchElement(<Button className='c-third__button-icon' label={thirdCategoryData.box3_link_text} status='warning' size='lrg' aria-label={thirdCategoryData.box3_link_text} onClick={emptyFunction} />)
})
