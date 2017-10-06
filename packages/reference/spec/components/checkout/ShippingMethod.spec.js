// Component
import ShippingMethod from '../../../components/checkout/ShippingMethods'

// Fixture
import ShippingMethodsJson from '../../fixtures/shippingMethods.fixture'

test('render shipping methods as expected', () => {
  // arrange
  const shippingMethods = ShippingMethodsJson.shippingMethods
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

  // act
  const wrapper = mount(<ShippingMethod cart={cart} state={state} checkout={checkout} setShippingMethod={setShippingMethod} />)

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('1 item')
  expect(wrapper).toIncludeText(shippingMethods[0].title)
})

test('render collapsed view as expected', () => {
  // arrange
  const shippingMethods = ShippingMethodsJson.shippingMethods
  const state = {}

  const checkout = {
    shippingMethod: {
      ...shippingMethods[0],
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

  // act
  const wrapper = mount(<ShippingMethod state={state} cart={cart} checkout={checkout} />)

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText(shippingMethods[0].title)
  expect(wrapper).toIncludeText(shippingMethods[0].delivery_date)
  expect(wrapper).toIncludeText('Edit')
  expect(wrapper).not.toIncludeText(shippingMethods[1].title)
  expect(wrapper).not.toIncludeText('Shipping from')
  expect(wrapper).not.toIncludeText('Continue to Payment')
})

test('renders line item quantity as expected', () => {
  // arrange
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

  // act
  const wrapper = mount(<ShippingMethod cart={cart} state={state} checkout={checkout} setShippingMethod={setShippingMethod} />)

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('0 items')
})

test('display pre selected shipping method as selected option on page load', () => {
  // arrange
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
      ...shippingMethods[0],
      collapsed: false
    }
  }

  const selectedShippingMethod = shippingMethods[0]

  // act
  const wrapper = mount(<ShippingMethod cart={cart} state={state} checkout={checkout} setShippingMethod={setShippingMethod} />)
  const shippingNode = wrapper.find(`#${selectedShippingMethod.id}`)

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText(shippingMethods[1].title)
  expect(shippingNode.props().checked).toBe(true)
})

test('should be able to select a shipping method', () => {
  // arrange
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

  // act
  const wrapper = mount(<ShippingMethod cart={cart} state={state} checkout={checkout} setShippingMethod={setShippingMethod} />)
  const shippingNode = wrapper.find(`#${selectedShippingMethod.id}`)
  shippingNode.simulate('change', { trigger: { checked: true } })

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText(shippingMethods[1].title)
  expect(shippingNode.props().checked).toBe(true)
  expect(wrapper.state().selectedShippingMethod.id).toBe(selectedShippingMethod.id)
})
