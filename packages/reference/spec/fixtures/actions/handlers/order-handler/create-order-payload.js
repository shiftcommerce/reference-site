export default {
  'data': {
    'attributes': {
      'billing_address': {
        'id': '',
        'attributes': {
          'address_line_1': '104 Quay One',
          'address_line_2': '',
          'city': 'Leeds',
          'country': 'GB',
          'first_name': 'John',
          'last_name': 'Smith',
          'postcode': 'LS9 8DS'
        },
        'type': 'addresses'
      },
      'channel': 'web',
      'currency': 'GBP',
      'email': 'john.smith@shiftcommerce.com',
      'ip_address': '',
      'line_items_resources': [
        {
          'attributes': {
            'sku': 'bdm1',
            'title': 'Brazil Daterra masterpiece - Curupira',
            'unit_quantity': 1,
            'unit_price': '16.5',
            'taxes': 0
          },
          'type': 'line_items'
        },
        {
          'attributes': {
            'sku': '1425689355217',
            'title': 'SCS-04-CJ coffee jug 600ml',
            'unit_quantity': 1,
            'unit_price': '90.31',
            'taxes': 0
          },
          'type': 'line_items'
        }
      ],
      'shipping_address': {
        'id': '',
        'attributes': {
          'address_line_1': '104 Quay One',
          'address_line_2': '',
          'city': 'Leeds',
          'country': 'GB',
          'first_name': 'John',
          'last_name': 'Smith',
          'postcode': 'LS9 8DS'
        },
        'type': 'addresses'
      },
      'shipping_method': {
        'attributes': {
          'created_at': '2018-10-31T09:13:04.443Z',
          'description': 'Sunday 2nd December',
          'label': 'Super Saver',
          'meta_attributes': {

          },
          'reference': 'super_saver',
          'sku': 'super_saver',
          'sub_total': 3.45,
          'tax': 2,
          'tax_rate': 20,
          'total': 3.45,
          'updated_at': '2018-10-31T09:13:04.443Z'
        },
        'id': '1',
        'type': 'shipping_methods'
      },
      'discount_summaries': [
        {
          'id': '',
          'type': 'discount_summaries',
          'attributes': {
            'total': 0,
            'name': '',
            'promotion_id': 0
          }
        }
      ],
      'sub_total': 106.81,
      'total': 110.26,
      'shipping_total': 3.45,
      'tax': 0
    },
    'type': 'create_order'
  },
  'payment_method': 'card',
  'card_token': {
    'id': 'tok_1DRFlBIZ9svPgtYNNJi6ZDcu',
    'object': 'token',
    'card': {
      'id': 'card_1DRFlBIZ9svPgtYNVvCiUDXh',
      'object': 'card',
      'address_city': 'Leeds',
      'address_country': 'GB',
      'address_line1': '104 Quay One',
      'address_line1_check': 'unchecked',
      'address_line2': '',
      'address_state': 'Some state',
      'address_zip': 'LS9 8DS',
      'address_zip_check': 'unchecked',
      'brand': 'Visa',
      'country': 'US',
      'cvc_check': 'unchecked',
      'dynamic_last4': null,
      'exp_month': 9,
      'exp_year': 2029,
      'funding': 'credit',
      'last4': '4242',
      'metadata': {

      },
      'name': 'John Smith',
      'tokenization_method': null
    },
    'client_ip': '141.170.10.220',
    'created': 1540977189,
    'livemode': false,
    'type': 'card',
    'used': false
  }
}
