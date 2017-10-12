const Checkout = {
  'request_uuid': 6765757657657,
  'retail_price_inc_tax': '0105.45',
  'paid_price_inc_tax': '0105.45',
  'tax_amount': 0,
  'currency': 'GBP',
  'lineItems': [
    {
      'sku': 'SK840763631-2',
      'quantity': 3,
      'retail_price_inc_tax': '10',
      'paid_price_inc_tax': '10',
      'tax_percentage': 0,
      'tax_amount': 0,
      'currency': 'GBP',
      'title': 'Textured Long T Shirt'
    }
  ],
  'customer': {
    'email': 'customer@example.com',
    'name': 'John Doe',
    'external_id': '123'
  },
  'shippingMethod': {
    'id': '2',
    'name': 'UPS Next Day',
    'retail_price_inc_tax': 5.45,
    'paid_price_inc_tax': 5.45,
    'tax_amount': 2,
    'tax_percentage': 20,
    'sku': 'ups_next_day',
    'reference': 'ups_next_day'
  },
  'billingAddress': {
    'label': 'BILLING_LABEL',
    'first_name': 'Prasanna Gaddam',
    'last_name': 'Prasanna Gaddam',
    'line_1': 'Apartment 19, Waterloo Court, 17 Hunslet Road',
    'line_2': 'Hunslet',
    'city': 'Leeds',
    'state': 'Yorkshire',
    'zipcode': 'LS10 1QN',
    'country_code': 'GBP',
    'primary_phone': '7761410740'
  },
  'shippingAddress': {
    'label': 'BILLING_LABEL',
    'first_name': 'Prasanna Gaddam',
    'last_name': 'Prasanna Gaddam',
    'line_1': 'Apartment 19, Waterloo Court, 17 Hunslet Road',
    'line_2': 'Hunslet',
    'city': 'Leeds',
    'state': 'Yorkshire',
    'zipcode': 'LS10 1QN',
    'country_code': 'GBP',
    'primary_phone': '7761410740'
  },
  'paymentMethod': {
    'collapsed': false
  }
}

export default Checkout
