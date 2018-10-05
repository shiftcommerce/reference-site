// Component
import DeliveryInformation from '../../../../../client/components/products/display/DeliveryInformation'

test('renders correctly', () => {
  // Arrange & Act
  const wrapper = mount(
    <DeliveryInformation />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
})
