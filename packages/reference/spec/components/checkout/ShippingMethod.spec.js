// Component
import ShippingMethod from '../../../components/checkout/ShippingMethods'

// Fixture
import ShippingMethodsJson from '../../fixtures/shippingMethods.fixture'

test('render shipping methods as expected', () => {
  // Arrange
  const shippingMethods = ShippingMethodsJson.shippingMethods
  const selectedShippingMethod = shippingMethods[0]
  const state = {
    shippingMethods: shippingMethods,
    collapsed: false
  }
  const setShippingMethod = () => {}

  const cart = {
    lineItems: [
      {
        id: '1'
      }
    ]
  }

  const checkout = {
    shippingMethod: {}
  }

  // Act
  const wrapper = mount(<ShippingMethod cart={cart} state={state} checkout={checkout} setShippingMethod={setShippingMethod} />)

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('1 item')
  expect(wrapper).toIncludeText(selectedShippingMethod.name)
})

test('render collapsed view as expected', () => {
  // Arrange
  const shippingMethods = ShippingMethodsJson.shippingMethods
  const selectedShippingMethod = shippingMethods[0]
  const state = {}

  const checkout = {
    shippingMethod: {
      ...selectedShippingMethod,
      collapsed: true
    }
  }

  const cart = {
    lineItems: [
      {
        id: '1'
      }
    ]
  }

  // Act
  const wrapper = mount(<ShippingMethod state={state} cart={cart} checkout={checkout} />)

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText(selectedShippingMethod.name)
  expect(wrapper).toIncludeText(selectedShippingMethod.delivery_date)
  expect(wrapper).toIncludeText('Edit')
  expect(wrapper).not.toIncludeText(shippingMethods[1].name)
  expect(wrapper).not.toIncludeText('Shipping from')
  expect(wrapper).not.toIncludeText('Continue to Payment')
})

test('renders line item quantity as expected', () => {
  // Arrange
  const shippingMethods = ShippingMethodsJson.shippingMethods
  const state = {
    shippingMethods: shippingMethods
  }
  const setShippingMethod = () => {}

  const cart = {
    lineItems: []
  }

  const checkout = {
    shippingMethod: {
      collapsed: false
    }
  }

  // Act
  const wrapper = mount(<ShippingMethod cart={cart} state={state} checkout={checkout} setShippingMethod={setShippingMethod} />)

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('0 items')
})

test('display pre selected shipping method as selected option on page load', () => {
  // Arrange
  const shippingMethods = ShippingMethodsJson.shippingMethods
  const selectedShippingMethod = shippingMethods[0]
  const state = {
    shippingMethods: shippingMethods
  }
  const setShippingMethod = () => {}

  const cart = {
    lineItems: []
  }

  const checkout = {
    shippingMethod: {
      ...selectedShippingMethod,
      collapsed: false
    }
  }

  // Act
  const wrapper = mount(<ShippingMethod cart={cart} state={state} checkout={checkout} setShippingMethod={setShippingMethod} />)
  const shippingNode = wrapper.find(`#${selectedShippingMethod.sku}_${selectedShippingMethod.id}`)

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText(selectedShippingMethod.name)
  expect(shippingNode.props().checked).toBe(true)
})

test('should be able to select a shipping method', () => {
  // Arrange
  const shippingMethods = ShippingMethodsJson.shippingMethods
  const state = {
    shippingMethods: shippingMethods,
    selectedShippingMethod: ''
  }
  const setShippingMethod = () => {}

  const cart = {
    lineItems: []
  }

  const checkout = {
    shippingMethod: {
      collapsed: false
    }
  }
  const selectedShippingMethod = shippingMethods[0]

  // Act
  const wrapper = mount(<ShippingMethod cart={cart} state={state} checkout={checkout} setShippingMethod={setShippingMethod} />)

  wrapper.find(`input[id="${selectedShippingMethod.sku}_${selectedShippingMethod.id}"]`).simulate('change', {target: { checked: true }})

  const shippingNode = wrapper.find(`#${selectedShippingMethod.sku}_${selectedShippingMethod.id}`)

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText(selectedShippingMethod.name)
  expect(wrapper.state().selectedShippingMethod.id).toBe(selectedShippingMethod.id)
  expect(shippingNode.props().checked).toBe(true)
})
