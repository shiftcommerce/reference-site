export default {
  data: {
    id: '23063267',
    type: 'customer_accounts',
    links: {
      self: '/integration/v1/customer_accounts/23063267.json_api'
    },
    attributes: {
      meta_attributes: {
        first_name: {
          value: 'a',
          data_type: 'text'
        },
        last_name: {
          value: 'fletcher',
          data_type: 'text'
        }
      },
      email: 'a.fletcher1234@gmail.com'
    },
    relationships: {
      addresses: {
        links: {
          self: '/integration/v1/customer_accounts/23063267/relationships/addresses.json_api',
          related: '/integration/v1/customer_accounts/23063267/addresses.json_api'
        }
      },
      orders: {
        links: {
          self: '/integration/v1/customer_accounts/23063267/relationships/orders.json_api',
          related: 'https://devintegrations.shiftstage.com/orders/?shopatron_customer_id='
        }
      },
      cart: {
        links: {
          self: '/integration/v1/customer_accounts/23063267/relationships/cart.json_api',
          related: '/integration/v1/customer_accounts/23063267/cart.json_api'
        }
      },
      customer_segments: {
        links: {
          self: '/integration/v1/customer_accounts/23063267/relationships/customer_segments.json_api',
          related: '/integration/v1/customer_accounts/23063267/customer_segments.json_api'
        }
      },
      password_recovery: {
        links: {
          self: '/integration/v1/customer_accounts/23063267/relationships/password_recovery.json_api',
          related: '/integration/v1/customer_accounts/23063267/password_recovery.json_api'
        }
      }
    }
  },
  meta: {},
  links: {
    self: '/integration/v1/customer_accounts'
  }
}
