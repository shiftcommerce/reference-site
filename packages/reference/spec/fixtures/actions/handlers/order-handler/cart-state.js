export default {
  sub_total: 106.81,
  tax: 0,
  shipping_total: 3.45,
  total: 110.26,
  line_items: [
    {
      sku: 'bdm1',
      title: 'Brazil Daterra masterpiece - Curupira',
      unit_quantity: 1,
      unit_price: '16.5',
      tax: 2.75,
      line_item_discounts: [
        {
          id: '0d716b3f-dc2b-428f-991f-78a0b43e079c',
          updated_at: null,
          created_at: null,
          line_item_number: 1,
          promotion_id: 21,
          total: 0.19
        }, {
          id: '1ba448e0-a59d-4b83-9fcd-42cc2d0664d0',
          updated_at: null,
          created_at: null,
          line_item_number: 1,
          promotion_id: 22,
          total: 1.26
        }
      ]
    },
    {
      sku: '1425689355217',
      title: 'SCS-04-CJ coffee jug 600ml',
      unit_quantity: 1,
      unit_price: '90.31',
      tax: 15.05,
      line_item_discounts: []
    }
  ],
  discount_summaries: [{
    id: 'e8a4da3c-16cd-45f0-8d3a-c78ad99f79f3',
    name: '£1.50 off all orders',
    promotion_id: 21,
    total: 1.5
  }],
  billing_address: {
    id: '1',
    address_line_1: 'Billing address line 1',
    address_line_2: 'Billing address line 2',
    city: 'Billing city',
    country: 'Billing country',
    first_name: 'Billing first name',
    last_name: 'Billing last name',
    postcode: 'Billing postcode'
  },
  shipping_address: {
    id: '1',
    address_line_1: 'Shipping address line 1',
    address_line_2: 'Shipping address line 2',
    city: 'Shipping city',
    country: 'Shipping country',
    first_name: 'Shipping first name',
    last_name: 'Shipping last name',
    postcode: 'Shipping postcode'
  },
  shipping_method: {
    id: '10',
    description: 'Next day delivery',
    label: 'NEXT_DAY',
    meta_attributes: {
      working_days: {
        value: '2',
        data_type: 'text'
      }
    },
    reference: 'ND',
    sku: 'ND_D',
    sub_total: 1.62,
    tax: 0.33,
    tax_rate: 0.2,
    total: 1.95
  }
}
