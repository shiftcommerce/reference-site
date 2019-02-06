// Libraries
import { Provider } from 'react-redux'
import { createMockStore } from 'redux-test-utils'

// Pages
import { MyAccount } from '../../../../client/pages/account/myaccount'

// Components
import { OrderLineItems, ShippingAddresses } from 'shift-react-components'

// Fixtures
import orders from '../../../fixtures/orders'

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {}
}))

describe('My Account page', () => {
  test('renders a default message if the customer has no orders', () => {
    // Act
    const wrapper = mount(
      <Provider store={createMockStore()}>
        <MyAccount orders={{ data: [], loading: false }} dispatch={jest.fn()} />
      </Provider>
    )

    // Assert
    expect(wrapper).toIncludeText('No previous orders found.')
  })

  test('renders a customers previous orders', () => {
    // Act
    const wrapper = mount(
      <Provider store={createMockStore()}>
        <MyAccount orders={orders} dispatch={jest.fn()} />
      </Provider>
    )

    // Assert
    expect(wrapper).toIncludeText(`Order Number: ${orders.data[0].reference}`)
    expect(wrapper).toIncludeText(`Order Number: ${orders.data[1].reference}`)

    expect(wrapper).toContainReact(<OrderLineItems items={orders.data[0].line_items} />)
    expect(wrapper).toContainReact(<OrderLineItems items={orders.data[1].line_items} />)

    expect(wrapper).toContainReact(<ShippingAddresses addresses={orders.data[0].shipping_addresses} />)
    expect(wrapper).toContainReact(<ShippingAddresses addresses={orders.data[1].shipping_addresses} />)
  })
})
