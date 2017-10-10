// Component
import DeliveryInformation from '../../../../components/products/pdp/DeliveryInformation'

test('renders correctly', () => {
  // Arrange & Act
  const wrapper = mount(
    <DeliveryInformation />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
})
