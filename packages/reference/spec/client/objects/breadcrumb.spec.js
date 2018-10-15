// Object
import Breadcrumb from '../../../client/objects/breadcrumb'

// Fixtures
import breadcrumbMenuTrail from '../../fixtures/breadcrumbs'

test('renders correctly', () => {
  // Arrange & Act
  const wrapper = mount(
    <Breadcrumb trail={breadcrumbMenuTrail} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
})
