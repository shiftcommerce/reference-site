// Component
import { PLP } from '../../../components/products/PLP'

// Fixtures
import resultState from '../../fixtures/searchResultState.fixture'

test('renders correctly', () => {
  // Arrange
  const searchState = {}
  const category = 'Bathroom'

  // Act
  const wrapper = shallow(
    <PLP category={category} resultState={resultState} searchState={searchState} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
})
