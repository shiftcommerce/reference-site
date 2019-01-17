export default {
  data: {
    attributes: {
      billing_address: {
        id: '1',
        attributes: {
          address_line_1: 'Billing address line 1',
          address_line_2: 'Billing address line 2',
          city: 'Billing city',
          country: 'Billing country',
          first_name: 'Billing first name',
          last_name: 'Billing last name',
          postcode: 'Billing postcode'
        },
        type: 'addresses'
      },
      channel: 'web',
      currency: 'GBP',
      email: 'john.smith@shiftcommerce.com',
      line_items_resources: [
        {
          attributes: {
            sku: 'bdm1',
            title: 'Brazil Daterra masterpiece - Curupira',
            unit_quantity: 1,
            unit_price: '16.5',
            taxes: 2.75,
            line_item_discounts: [{
              attributes: {
                line_item_number: 1,
                promotion_id: 21,
                total: 0.19
              },
              id: '0d716b3f-dc2b-428f-991f-78a0b43e079c',
              type: 'line_item_discounts'
            }, {
              attributes: {
                line_item_number: 1,
                promotion_id: 22,
                total: 1.26
              },
              id: '1ba448e0-a59d-4b83-9fcd-42cc2d0664d0',
              type: 'line_item_discounts'
            }]
          },
          type: 'line_items'
        },
        {
          attributes: {
            sku: '1425689355217',
            title: 'SCS-04-CJ coffee jug 600ml',
            unit_quantity: 1,
            unit_price: '90.31',
            taxes: 15.05
          },
          type: 'line_items'
        }
      ],
      shipping_address: {
        id: '1',
        attributes: {
          address_line_1: 'Shipping address line 1',
          address_line_2: 'Shipping address line 2',
          city: 'Shipping city',
          country: 'Shipping country',
          first_name: 'Shipping first name',
          last_name: 'Shipping last name',
          postcode: 'Shipping postcode'
        },
        type: 'addresses'
      },
      shipping_method: {
        id: '10',
        type: 'shipping_methods',
        attributes: {
          description: 'Next day delivery',
          label: 'NEXT_DAY',
          meta_attributes: {
            working_days: {
              data_type: 'text',
              value: '2'
            }
          },
          reference: 'ND',
          sku: 'ND_D',
          sub_total: 1.62,
          tax: 0.33,
          tax_rate: 0.2,
          total: 1.95
        }
      },
      discount_summaries: [{
        id: 'e8a4da3c-16cd-45f0-8d3a-c78ad99f79f3',
        type: 'discount_summaries',
        attributes: {
          name: '£1.50 off all orders',
          promotion_id: 21,
          total: 1.5
        }
      }],
      sub_total: 106.81,
      total: 110.26,
      shipping_total: 3.45,
      tax: 0
    },
    type: 'create_order'
  },
  payment_method: 'card',
  card_token: {
    id: 'tok_1DRFlBIZ9svPgtYNNJi6ZDcu',
    object: 'token',
    card: {
      id: 'card_1DRFlBIZ9svPgtYNVvCiUDXh',
      object: 'card',
      address_city: 'Leeds',
      address_country: 'GB',
      address_line1: '104 Quay One',
      address_line1_check: 'unchecked',
      address_line2: '',
      address_state: 'Some state',
      address_zip: 'LS9 8DS',
      address_zip_check: 'unchecked',
      brand: 'Visa',
      country: 'US',
      cvc_check: 'unchecked',
      dynamic_last4: null,
      exp_month: 9,
      exp_year: 2029,
      funding: 'credit',
      last4: '4242',
      metadata: {

      },
      name: 'John Smith',
      tokenization_method: null
    },
    client_ip: '141.170.10.220',
    created: 1540977189,
    livemode: false,
    type: 'card',
    used: false
  }
}
