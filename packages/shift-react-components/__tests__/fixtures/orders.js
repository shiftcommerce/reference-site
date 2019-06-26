const orders = {
  loading: false,
  data: [
    {
      "account_reference": "shift",
      "billing_addresses": [
        {
          "city": "Wakefield",
          "company": "COMPANY",
          "country": "GB",
          "id": "f52d57e1-5960-4bd6-8cd4-3f6b856b365d_1",
          "lines": [
            "1 Scott Drive",
            "Crofton"
          ],
          "name": "Callum Barratt",
          "postcode": "WF4 1TD",
          "state": "West Yorkshire"
        }
      ],
      "discounts": [],
      "fulfillment_status": "unfulfilled",
      "id": "f52d57e1-5960-4bd6-8cd4-3f6b856b365d",
      "line_items": [
        {
          "discounts": [],
          "id": "f52d57e1-5960-4bd6-8cd4-3f6b856b365d_0",
          "image_urls": [
            "https://shift-platform-dev-assets.s3-eu-west-1.amazonaws.com/uploads/asset_file/asset_file/4/1561548220.1977956-14.jpg"
          ],
          "pricing": {
            "each_ex_tax": 3015,
            "each_inc_tax": 3618,
            "line_discount_ex_tax": 0,
            "line_discount_inc_tax": 0,
            "line_total_ex_tax": 3015,
            "line_total_inc_tax": 3618,
            "pre_discount_line_total_ex_tax": 3015,
            "pre_discount_line_total_inc_tax": 3618,
            "tax_rate": 20
          },
          "quantity": 1,
          "shipping_address": {
            "city": "Wakefield",
            "company": 'COMPANY',
            "country": "GB",
            "id": "f52d57e1-5960-4bd6-8cd4-3f6b856b365d_1",
            "lines": [
              "1 Scott Drive",
              "Crofton"
            ],
            "name": "Callum Barratt",
            "postcode": "WF4 1TD",
            "state": "West Yorkshire"
          },
          "shipping_method": {
            "id": "f52d57e1-5960-4bd6-8cd4-3f6b856b365d_4",
            "label": "Standard",
            "price": 1500
          },
          "sku": "2190404599946",
          "title": "Product 4 - Incredible Wooden Car - Variant 2 for Product 4 - Incredible Wooden Car"
        }
      ],
      "placed_at": "2019-06-26T15:53:49.000Z",
      "pricing": {
        "currency": "GBP",
        "order_discount_ex_tax": 1500,
        "order_discount_inc_tax": 1500,
        "pre_discount_line_items_total_ex_tax": 3015,
        "pre_discount_line_items_total_inc_tax": 3618,
        "total_discount_ex_tax": 1500,
        "total_discount_inc_tax": 1500,
        "total_ex_tax": 4515,
        "total_inc_tax": 5118
      },
      "reference": "7",
      "shipping_addresses": [
        {
          "city": "Wakefield",
          "company": "COMPANY",
          "country": "GB",
          "id": "f52d57e1-5960-4bd6-8cd4-3f6b856b365d_1",
          "lines": [
            "1 Scott Drive",
            "Crofton"
          ],
          "name": "Callum Barratt",
          "postcode": "WF4 1TD",
          "state": "West Yorkshire"
        }
      ],
      "shipping_methods": [
        {
          "id": "f52d57e1-5960-4bd6-8cd4-3f6b856b365d_4",
          "label": "Standard",
          "price": 1500
        }
      ]
    },
    {
      id: 'fda3fcff-92c7-414a-bdea-156cde21a926',
      account_reference: 'shiftacc',
      reference: '1001',
      placed_at: '2018-01-01T12:00:00.000Z',
      pricing: {
        currency: 'GBP',
        total_ex_tax: 125900,
        total_inc_tax: 160600,
        pre_discount_total_ex_tax: 126600,
        pre_discount_total_inc_tax: 151440,
        total_discount_ex_tax: 700,
        total_discount_inc_tax: 840
      },
      customer: {
        id: 'fda3fcff-92c7-414a-bdea-156cde21a926',
        reference: '23063301',
        email: 'test@shiftcommerce.com',
        name: 'SHIFT',
        meta_attributes: {}
      },
      line_items: [
        {
          id: 'fda3fcff-92c7-414a-bdea-156cde21a926_0',
          sku: 'WHITE-TSHIRT-XXL',
          quantity: 5,
          pricing: {
            each_ex_tax: 1200,
            each_inc_tax: 1440,
            line_ex_tax: 6000,
            line_total_inc_tax: 7200,
            line_discount_ex_tax: 0,
            line_discount_inc_tax: 0,
            tax_rate: 12000
          },
          image_urls: [
            'https://example.com/path/to/image.jpg',
            'https://example.com/path/to/image1.jpg'
          ],
          shipping_method: {
            id: 'fda3fcff-92c7-414a-bdea-156cde21a926_1',
            label: 'Next Day Delivery',
            price: 599,
            meta_attributes: {
              sku: 'NEXTDAY'
            }
          },
          shipping_address: {
            id: 'fda3fcff-92c7-414a-bdea-156cde21a926_1',
            name: 'Test Customer',
            company: 'SHIFT Commerce',
            lines: [
              'The Calls'
            ],
            city: 'Leeds',
            state: 'West Yorkshire',
            postcode: 'LS2 7EY',
            country: 'United Kingdom',
            meta_attributes: {
              further: 'information'
            }
          },
          discounts: [],
          individual_prices: []
        },
        {
          id: 'fda3fcff-92c7-414a-bdea-156cde21a926_1',
          sku: 'BLACK-SOCKS-001',
          quantity: 3,
          pricing: {
            each_ex_tax: 200,
            each_inc_tax: 240,
            line_ex_tax: 400,
            line_total_inc_tax: 480,
            line_discount_ex_tax: 200,
            line_discount_inc_tax: 240,
            tax_rate: 12000
          },
          image_urls: [],
          shipping_method: {
            id: 'fda3fcff-92c7-414a-bdea-156cde21a926_2',
            label: 'Two-man Delivery',
            price: 2499,
            meta_attributes: {
              sku: 'DROPSHIP'
            }
          },
          shipping_address: {
            id: 'fda3fcff-92c7-414a-bdea-156cde21a926_2',
            name: 'Test Customer 2',
            company: 'COMPANY',
            lines: [
              'SHIFT Commerce',
              'The Calls Landing'
            ],
            city: 'Leeds',
            state: 'West Yorkshire',
            postcode: 'LS2 7EY',
            country: 'United Kingdom',
            meta_attributes: {
              further: 'information'
            }
          },
          discounts: [
            {
              id: 'fda3fcff-92c7-414a-bdea-156cde21a926_1_0',
              label: '3 for 2 on Socks',
              amount_ex_tax: 200,
              amount_inc_tax: 240,
              coupon_code: '3FOR2SOCKS',
              meta_attributes: {}
            }
          ],
          individual_prices: [
            {
              id: 'fda3fcff-92c7-414a-bdea-156cde21a926_1_0',
              ex_tax: 133,
              inc_tax: 160,
              discount_ex_tax: 67,
              discount_inc_tax: 80,
              discounts: [
                {
                  id: 'fda3fcff-92c7-414a-bdea-156cde21a926_1_0_0',
                  label: '3 for 2 on Socks',
                  amount_ex_tax: 67,
                  amount_inc_tax: 80,
                  coupon_code: null,
                  meta_attributes: {}
                }
              ]
            },
            {
              id: 'fda3fcff-92c7-414a-bdea-156cde21a926_1_1',
              ex_tax: 133,
              inc_tax: 160,
              discount_ex_tax: 67,
              discount_inc_tax: 80,
              discounts: [
                {
                  id: 'fda3fcff-92c7-414a-bdea-156cde21a926_1_1_0',
                  label: '3 for 2 on Socks',
                  amount_ex_tax: 67,
                  amount_inc_tax: 80,
                  coupon_code: null,
                  meta_attributes: {}
                }
              ]
            },
            {
              id: 'fda3fcff-92c7-414a-bdea-156cde21a926_1_2',
              ex_tax: 134,
              inc_tax: 160,
              discount_ex_tax: 66,
              discount_inc_tax: 80,
              discounts: [
                {
                  id: 'fda3fcff-92c7-414a-bdea-156cde21a926_1_2_0',
                  label: '3 for 2 on Socks',
                  amount_ex_tax: 66,
                  amount_inc_tax: 80,
                  coupon_code: null,
                  meta_attributes: {}
                }
              ]
            }
          ]
        },
        {
          id: 'fda3fcff-92c7-414a-bdea-156cde21a926_2',
          sku: 'WHITE-TSHIRT-L',
          quantity: 1,
          pricing: {
            each_ex_tax: 120000,
            each_inc_tax: 144000,
            line_ex_tax: 120000,
            line_total_inc_tax: 144000,
            line_discount_ex_tax: 0,
            line_discount_inc_tax: 0,
            tax_rate: 12000
          },
          image_urls: [],
          shipping_method: {
            id: 'fda3fcff-92c7-414a-bdea-156cde21a926_1',
            label: 'Next Day Delivery',
            price: 599,
            meta_attributes: {
              sku: 'NEXTDAY'
            }
          },
          shipping_address: {
            id: 'fda3fcff-92c7-414a-bdea-156cde21a926_1',
            name: 'Test Customer',
            company: 'SHIFT Commerce',
            lines: [
              'The Calls'
            ],
            city: 'Leeds',
            state: 'West Yorkshire',
            postcode: 'LS2 7EY',
            country: 'United Kingdom',
            meta_attributes: {
              further: 'information'
            }
          },
          discounts: [],
          individual_prices: []
        }
      ],
      shipping_methods: [
        {
          id: 'fda3fcff-92c7-414a-bdea-156cde21a926_1',
          label: 'Next Day Delivery',
          price: 599,
          meta_attributes: {
            sku: 'NEXTDAY'
          }
        },
        {
          id: 'fda3fcff-92c7-414a-bdea-156cde21a926_2',
          label: 'Two-man Delivery',
          price: 2499,
          meta_attributes: {
            sku: 'DROPSHIP'
          }
        }
      ],
      shipping_addresses: [
        {
          id: 'fda3fcff-92c7-414a-bdea-156cde21a926_1',
          name: 'Test Customer',
          company: 'SHIFT Commerce',
          lines: [
            'The Calls'
          ],
          city: 'Leeds',
          state: 'West Yorkshire',
          postcode: 'LS2 7EY',
          country: 'United Kingdom',
          meta_attributes: {
            further: 'information'
          }
        },
        {
          id: 'fda3fcff-92c7-414a-bdea-156cde21a926_2',
          name: 'Test Customer 2',
          company: 'COMPANY',
          lines: [
            'SHIFT Commerce',
            'The Calls Landing'
          ],
          city: 'Leeds',
          state: 'West Yorkshire',
          postcode: 'LS2 7EY',
          country: 'United Kingdom',
          meta_attributes: {
            further: 'information'
          }
        }
      ]
    }
  ],
  pagination: {
    first: 'http://host.docker.internal:4000/oms/v1/order_histories?fields%5Border_histories%5D=account_reference%2Creference%2Cplaced_at%2Ccustomer%2Cpricing%2Cline_items%2Cshipping_addresses%2Cshipping_methods&include=customer%2Cshipping_methods%2Cshipping_addresses%2Cbilling_addresses%2Cdiscounts%2Cline_items%2Cline_items.shipping_method%2Cline_items.shipping_address%2Cline_items.discounts%2Cline_items.individual_prices%2Cline_items.individual_prices.discounts%2Cpayments.billing_address&page%5Blimit%5D=10&page%5Boffset%5D=0',
    last: 'http://host.docker.internal:4000/oms/v1/order_histories?fields%5Border_histories%5D=account_reference%2Creference%2Cplaced_at%2Ccustomer%2Cpricing%2Cline_items%2Cshipping_addresses%2Cshipping_methods&include=customer%2Cshipping_methods%2Cshipping_addresses%2Cbilling_addresses%2Cdiscounts%2Cline_items%2Cline_items.shipping_method%2Cline_items.shipping_address%2Cline_items.discounts%2Cline_items.individual_prices%2Cline_items.individual_prices.discounts%2Cpayments.billing_address&page%5Blimit%5D=10&page%5Boffset%5D=0'
  }
}

export default orders
