// Component
import ShippingMethod from '../../../../client/components/checkout/shipping-methods'
import * as apiActions from '../../../../client/actions/api-actions'

// Lib
import { businessDaysFromNow } from '../../../../client/lib/business-days-from-now'

test('render shipping methods as expected', async () => {
  // Arrange
  const cart = {
    line_items: [
      {
        id: '1'
      }
    ],
    line_items_count: 1,
    shipping_method: {}
  }

  const checkout = {
    shippingAddress: {
      collapsed: true,
      completed: true
    },
    shippingMethod: {}
  }

  const fetchShippingSpy = jest.spyOn(ShippingMethod, 'fetchShippingMethods').mockImplementation(() => Promise.resolve({
    data: [{
      id: 1,
      sku: 'STA_SHIP',
      label: 'Standard shipping',
      total: 3.75,
      meta_attributes: {
        working_days: {
          value: 2
        }
      }
    }]
  }))

  // Act
  const wrapper = mount(<ShippingMethod cart={cart} checkout={checkout} dispatch={jest.fn()} />)

  // Assert
  expect(wrapper).toIncludeText('Loading...')
  expect(wrapper).toMatchSnapshot()

  await wrapper.instance().componentDidMount()

  expect(wrapper).toIncludeText('1 item')
  expect(wrapper).toIncludeText('Standard shipping')

  fetchShippingSpy.mockRestore()
})

test('render shipping methods before data has returned, should not error', async () => {
  // Arrange
  const cart = {
    line_items: [
      {
        id: '1'
      }
    ],
    line_items_count: 1,
    shipping_method: null
  }

  const checkout = {
    shippingAddress: {
      collapsed: true,
      completed: true
    },
    shippingMethod: {}
  }

  // Act
  const wrapper = mount(<ShippingMethod cart={cart} checkout={checkout} dispatch={jest.fn()} />)

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Loading...')
})

test('render collapsed view as expected', async () => {
  // Arrange
  const checkout = {
    shippingAddress: {
      collapsed: true,
      completed: true
    },
    shippingMethod: {
      collapsed: true
    }
  }

  const cart = {
    line_items: [
      {
        id: '1'
      }
    ],
    line_items_count: 1,
    shipping_method: {
      id: 1,
      sku: 'STA_SHIP',
      label: 'Standard shipping',
      total: 3.75,
      meta_attributes: {
        working_days: {
          value: 2
        }
      }
    }
  }

  const fetchShippingSpy = jest.spyOn(ShippingMethod, 'fetchShippingMethods').mockImplementation(() => Promise.resolve({ data: [] }))

  // Act
  const wrapper = mount(<ShippingMethod cart={cart} checkout={checkout} dispatch={jest.fn()} />)

  // Assert
  expect(wrapper).toIncludeText('Loading...')

  await wrapper.instance().componentDidMount()

  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Standard shipping')
  expect(wrapper).toIncludeText(businessDaysFromNow(2).format('dddd Do MMMM'))
  expect(wrapper).toIncludeText('Edit')
  expect(wrapper).not.toIncludeText('Shipping from')

  expect(wrapper).not.toIncludeText('Continue to Payment')

  fetchShippingSpy.mockRestore()
})

test('renders line item quantity as expected', async () => {
  // Arrange
  const cart = {
    line_items: [],
    line_items_count: 0,
    shipping_method: {
      id: 1,
      sku: 'STA_SHIP',
      label: 'Standard shipping',
      total: 3.75,
      meta_attributes: {
        working_days: {
          value: 2
        }
      }
    }
  }

  const checkout = {
    shippingAddress: {
      collapsed: true,
      completed: true
    },
    shippingMethod: {
      collapsed: false
    }
  }

  const fetchShippingSpy = jest.spyOn(ShippingMethod, 'fetchShippingMethods').mockImplementation(() => Promise.resolve({ data: [] }))

  // Act
  const wrapper = mount(<ShippingMethod cart={cart} checkout={checkout} />)

  // Assert
  expect(wrapper).toIncludeText('Loading...')

  await wrapper.instance().componentDidMount()

  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('0 items')

  fetchShippingSpy.mockRestore()
})

test('preselects first shipping method when fetching shipping methods and none is set', async () => {
  // Arrange
  const cart = {
    line_items: [],
    line_items_count: 0
  }

  const checkout = {
    shippingAddress: {
      collapsed: true,
      completed: true
    },
    shippingMethod: {
      collapsed: false
    }
  }

  const fetchShippingSpy = jest.spyOn(ShippingMethod, 'fetchShippingMethods').mockImplementation(() => Promise.resolve({
    data: [{
      id: 1,
      sku: 'STA_SHIP',
      label: 'Standard shipping',
      total: 3.75,
      meta_attributes: {
        working_days: {
          value: 2
        }
      }
    }, {
      id: 2,
      sku: 'NEX_SHIP',
      label: 'Next day delivery',
      total: 6.25,
      meta_attributes: {
        working_days: {
          value: 1
        }
      }
    }]
  }))

  const postSpy = jest.spyOn(apiActions, 'postEndpoint').mockImplementation(() => { cart.shipping_method = { id: 1 } })

  // Act
  const wrapper = mount(<ShippingMethod cart={cart} checkout={checkout} dispatch={jest.fn()} />)

  // Assert
  expect(wrapper).toIncludeText('Loading...')

  await wrapper.instance().componentDidMount()

  const request = postSpy.mock.calls[0][0]
  expect(request.endpoint).toEqual('/setShippingMethod')
  expect(request.body.shippingMethodId).toEqual(1)

  postSpy.mockRestore()
  fetchShippingSpy.mockRestore()
})

test('selecting a shipping method makes a correct API call', async () => {
  // Arrange
  const cart = {
    line_items: [],
    line_items_count: 1,
    shipping_method: {
      id: 1,
      sku: 'STA_SHIP',
      label: 'Standard shipping',
      total: 3.75,
      meta_attributes: {
        working_days: {
          value: 2
        }
      }
    }
  }

  const checkout = {
    shippingAddress: {
      collapsed: true,
      completed: true
    },
    shippingMethod: {
      collapsed: false
    }
  }

  const fetchShippingSpy = jest.spyOn(ShippingMethod, 'fetchShippingMethods').mockImplementation(() => Promise.resolve({
    data: [{
      id: 1,
      sku: 'STA_SHIP',
      label: 'Standard shipping',
      total: 3.75,
      meta_attributes: {
        working_days: {
          value: 2
        }
      }
    }, {
      id: 2,
      sku: 'NEX_SHIP',
      label: 'Next day delivery',
      total: 6.25,
      meta_attributes: {
        working_days: {
          value: 1
        }
      }
    }]
  }))

  const postSpy = jest.spyOn(apiActions, 'postEndpoint').mockImplementation(() => { cart.shipping_method = { id: 1 } })

  // Act
  const wrapper = mount(<ShippingMethod cart={cart} checkout={checkout} dispatch={jest.fn()} />)

  // Assert
  expect(wrapper).toIncludeText('Loading...')

  await wrapper.instance().componentDidMount()
  wrapper.update()

  wrapper.find('input[id="NEX_SHIP_2"]').simulate('change', { target: { checked: true } })

  const request = postSpy.mock.calls[0][0]
  expect(request.endpoint).toEqual('/setShippingMethod')
  expect(request.body.shippingMethodId).toEqual(2)

  fetchShippingSpy.mockRestore()
  postSpy.mockRestore()
})
