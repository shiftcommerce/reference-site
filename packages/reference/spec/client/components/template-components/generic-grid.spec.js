// Components
import GenericGrid from '../../../../client/components/template-components/generic-grid'

// Fixtures
import genericGridData from '../../../fixtures/generic-grid'

test('GenericGrid component renders correctly', () => {
  // Arrange & Act
  const wrapper = mount(
    <GenericGrid componentData={genericGridData} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText(genericGridData.header)
  expect(wrapper).toIncludeText(genericGridData.slide1_text)
  expect(wrapper).toIncludeText(genericGridData.slide2_text)
  expect(wrapper).toIncludeText(genericGridData.slide3_text)
  expect(wrapper.find('Link').first()).toHaveProp('href', genericGridData.slide1_url[0].canonical_path)
  expect(wrapper.find('button')).toMatchElement(<button>{ genericGridData.cat_text }</button>)
})
