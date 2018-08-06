// Components
import { RelatedLinks } from '../../../components/pages/RelatedLinks'

// Objects
import Button from '../../../objects/Button'

// Fixtures
import relatedLinksData from '../../fixtures/relatedLinks.fixture'

test('renders the full RelatedLinks component', () => {
  // Arrange
  const emptyFunction = () => {}

  // Act
  const wrapper = mount(
    <RelatedLinks links={relatedLinksData} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText(relatedLinksData.title)
  expect(wrapper.find('Button').at(0)).toMatchElement(<Button className='c-links__grid-button-icon' label={relatedLinksData.link1_text} status='warning' size='lrg' aria-label={relatedLinksData.link1_text} onClick={emptyFunction} />)
  expect(wrapper.find('Button').at(1)).toMatchElement(<Button className='c-links__grid-button-icon' label={relatedLinksData.link2_text} status='warning' size='lrg' aria-label={relatedLinksData.link2_text} onClick={emptyFunction} />)
  expect(wrapper.find('Button').at(2)).toMatchElement(<Button className='c-links__grid-button-icon' label={relatedLinksData.link3_text} status='warning' size='lrg' aria-label={relatedLinksData.link3_text} onClick={emptyFunction} />)
})
