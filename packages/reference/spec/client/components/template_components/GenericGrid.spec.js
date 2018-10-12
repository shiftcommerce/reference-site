// Components
import GenericGrid from '../../../../client/components/template_components/GenericGrid'

// Objects
import Button from '../../../../client/objects/Button'

// Fixtures
import genericGridData from '../../../fixtures/genericGrid.fixture'

test('GenericGrid component renders correctly', () => {
  // Arrange
  const emptyFunction = () => {}

  // Act
  const wrapper = mount(
    <GenericGrid component={genericGridData} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText(genericGridData.header)
  expect(wrapper).toIncludeText(genericGridData.slide1_text)
  expect(wrapper).toIncludeText(genericGridData.slide2_text)
  expect(wrapper).toIncludeText(genericGridData.slide3_text)
  expect(wrapper.find('Link').first()).toHaveProp('href', genericGridData.slide1_url[0].canonical_path)
  expect(wrapper.find('Button')).toMatchElement(<Button label={genericGridData.cat_text} onClick={emptyFunction} />)
})
