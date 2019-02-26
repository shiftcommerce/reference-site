// Libraries
import nock from 'nock'

// Component
import ShippingMethod from '../../../../client/components/checkout/shipping-methods'
import * as apiActions from '../../../../client/actions/api-actions'

afterEach(() => { nock.cleanAll() })

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

test('fetchShippingMethods() returns shipping methods from the API', async () => {
  nock(process.env.API_HOST_PROXY)
    .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    .get('/getShippingMethods')
    .reply(200, { data: 'shipping methods data' })

  expect(await ShippingMethod.fetchShippingMethods()).toEqual({ data: 'shipping methods data' })
})

test('fetches shipping methods, sorts them by total and puts them in state', async () => {
  const shippingMethods = {
    data: [{
      id: 1,
      total: 20,
      meta_attributes: {
        working_days: {
          value: 1
        }
      }
    }, {
      id: 2,
      total: 10,
      meta_attributes: {
        working_days: {
          value: 1
        }
      }
    }]
  }

  const cart = {
    shipping_method: {}
  }

  const instance = shallow(<ShippingMethod cart={cart} />).instance()

  const fetchShippingMethodsSpy = jest.spyOn(instance.constructor, 'fetchShippingMethods').mockImplementation(() => shippingMethods)

  await instance.componentDidMount()

  expect(instance.state).toEqual({
    loading: false,
    shippingMethods: shippingMethods.data
  })

  fetchShippingMethodsSpy.mockRestore()
})
