// Components
import { RelatedLinks } from '../../../../client/components/template-components/related-links'

// Fixtures
import relatedLinksData from '../../../fixtures/related-links'
import relatedLinksWithMissingURLsData from '../../../fixtures/related-links-with-missing-urls'

test('renders the full RelatedLinks component', () => {
  // Arrange & Act
  const wrapper = mount(
    <RelatedLinks componentData={relatedLinksData} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText(relatedLinksData.title)
  expect(wrapper.find('button').length).toBe(3)
  expect(wrapper.find('button').at(0)).toMatchElement(<button>{ relatedLinksData.link1_text }</button>)
  expect(wrapper.find('button').at(1)).toMatchElement(<button>{ relatedLinksData.link2_text }</button>)
  expect(wrapper.find('button').at(2)).toMatchElement(<button>{ relatedLinksData.link3_text }</button>)
})

test('renders correctly when some URLs are not set in the component', () => {
  // Arrange & Act
  const wrapper = mount(
    <RelatedLinks componentData={relatedLinksWithMissingURLsData} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText(relatedLinksWithMissingURLsData.title)
  expect(wrapper.find('button').length).toBe(1)
  expect(wrapper.find('button').at(0)).toMatchElement(<button>{ relatedLinksData.link1_text }</button>)
})
