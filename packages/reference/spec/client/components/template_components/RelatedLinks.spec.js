// Components
import { RelatedLinks } from '../../../../client/components/template_components/RelatedLinks'

// Objects
import Button from '../../../../client/objects/Button'

// Fixtures
import relatedLinksData from '../../../fixtures/relatedLinks.fixture'
import relatedLinksWithMissingURLsData from '../../../fixtures/relatedLinksWithMissingURLs.fixture'

test('renders the full RelatedLinks component', () => {
  // Arrange
  const emptyFunction = () => {}

  // Act
  const wrapper = mount(
    <RelatedLinks componentData={relatedLinksData} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText(relatedLinksData.title)
  expect(wrapper.find('Button').length).toBe(3)
  expect(wrapper.find('Button').at(0)).toMatchElement(<Button className='c-links__grid-button-icon' label={relatedLinksData.link1_text} status='warning' size='lrg' aria-label={relatedLinksData.link1_text} onClick={emptyFunction} />)
  expect(wrapper.find('Button').at(1)).toMatchElement(<Button className='c-links__grid-button-icon' label={relatedLinksData.link2_text} status='warning' size='lrg' aria-label={relatedLinksData.link2_text} onClick={emptyFunction} />)
  expect(wrapper.find('Button').at(2)).toMatchElement(<Button className='c-links__grid-button-icon' label={relatedLinksData.link3_text} status='warning' size='lrg' aria-label={relatedLinksData.link3_text} onClick={emptyFunction} />)
})

test('renders correctly when some URLs are not set in the component', () => {
  // Arrange
  const emptyFunction = () => {}

  // Act
  const wrapper = mount(
    <RelatedLinks componentData={relatedLinksWithMissingURLsData} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText(relatedLinksWithMissingURLsData.title)
  expect(wrapper.find('Button').length).toBe(1)
  expect(wrapper.find('Button').at(0)).toMatchElement(<Button className='c-links__grid-button-icon' label={relatedLinksData.link1_text} status='warning' size='lrg' aria-label={relatedLinksData.link1_text} onClick={emptyFunction} />)
})
