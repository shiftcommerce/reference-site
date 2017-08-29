// Object
import Breadcrumb from '../../objects/Breadcrumb'

// Fixtures
import breadcrumbMenuTrail from '../fixtures/breadcrumbs.fixture'

test('renders correctly', () => {
  // Arrange & Act
  const wrapper = mount(
    <Breadcrumb trail={breadcrumbMenuTrail} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
})
