// Object
import Breadcrumb from '../../../client/objects/Breadcrumb'

// Fixtures
import breadcrumbMenuTrail from '../../fixtures/breadcrumbs.fixture'

test('renders correctly', () => {
  // Arrange & Act
  const wrapper = mount(
    <Breadcrumb trail={breadcrumbMenuTrail} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
})
