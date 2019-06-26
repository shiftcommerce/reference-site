export default {
  "data":[
    {
      "id":"9f736e9a-0ffa-404d-bfd3-1bea4276a3fa",
      "type":"customer_orders",
      "links":{
        "self":"https://oms.shift.test/oms/v1/customer_orders/9f736e9a-0ffa-404d-bfd3-1bea4276a3fa"
      },
      "attributes":{
        "account_reference":"shift",
        "reference":"6",
        "placed_at":"2019-06-26T13:13:22.000Z",
        "pricing":{
          "currency":"GBP",
          "total_ex_tax":6709,
          "total_inc_tax":7851,
          "pre_discount_line_items_total_ex_tax":5709,
          "pre_discount_line_items_total_inc_tax":6851,
          "total_discount_ex_tax":1000,
          "total_discount_inc_tax":1000,
          "order_discount_ex_tax":1000,
          "order_discount_inc_tax":1000
        },
        "fulfillment_status":"unfulfilled"
      },
      "relationships":{
        "line_items":{
          "links":{
            "self":"https://oms.shift.test/oms/v1/customer_orders/9f736e9a-0ffa-404d-bfd3-1bea4276a3fa/relationships/line_items",
            "related":"https://oms.shift.test/oms/v1/customer_orders/9f736e9a-0ffa-404d-bfd3-1bea4276a3fa/line_items"
          },
          "data":[
            {
              "type":"line_items",
              "id":"9f736e9a-0ffa-404d-bfd3-1bea4276a3fa_0"
            }
          ]
        },
        "shipping_methods":{
          "links":{
            "self":"https://oms.shift.test/oms/v1/customer_orders/9f736e9a-0ffa-404d-bfd3-1bea4276a3fa/relationships/shipping_methods",
            "related":"https://oms.shift.test/oms/v1/customer_orders/9f736e9a-0ffa-404d-bfd3-1bea4276a3fa/shipping_methods"
          },
          "data":[
            {
              "type":"shipping_methods",
              "id":"9f736e9a-0ffa-404d-bfd3-1bea4276a3fa_3"
            }
          ]
        },
        "shipping_addresses":{
          "links":{
            "self":"https://oms.shift.test/oms/v1/customer_orders/9f736e9a-0ffa-404d-bfd3-1bea4276a3fa/relationships/shipping_addresses",
            "related":"https://oms.shift.test/oms/v1/customer_orders/9f736e9a-0ffa-404d-bfd3-1bea4276a3fa/shipping_addresses"
          },
          "data":[
            {
              "type":"shipping_addresses",
              "id":"9f736e9a-0ffa-404d-bfd3-1bea4276a3fa_1"
            }
          ]
        },
        "billing_addresses":{
          "links":{
            "self":"https://oms.shift.test/oms/v1/customer_orders/9f736e9a-0ffa-404d-bfd3-1bea4276a3fa/relationships/billing_addresses",
            "related":"https://oms.shift.test/oms/v1/customer_orders/9f736e9a-0ffa-404d-bfd3-1bea4276a3fa/billing_addresses"
          },
          "data":[
            {
              "type":"billing_addresses",
              "id":"9f736e9a-0ffa-404d-bfd3-1bea4276a3fa_1"
            }
          ]
        },
        "discounts":{
          "links":{
            "self":"https://oms.shift.test/oms/v1/customer_orders/9f736e9a-0ffa-404d-bfd3-1bea4276a3fa/relationships/discounts",
            "related":"https://oms.shift.test/oms/v1/customer_orders/9f736e9a-0ffa-404d-bfd3-1bea4276a3fa/discounts"
          },
          "data":[

          ]
        }
      }
    },
    {
      "id":"e94392c5-1565-48ac-be77-edea09d335c3",
      "type":"customer_orders",
      "links":{
        "self":"https://oms.shift.test/oms/v1/customer_orders/e94392c5-1565-48ac-be77-edea09d335c3"
      },
      "attributes":{
        "account_reference":"shift",
        "reference":"5",
        "placed_at":"2019-06-26T13:01:52.000Z",
        "pricing":{
          "currency":"GBP",
          "total_ex_tax":9046,
          "total_inc_tax":10555,
          "pre_discount_line_items_total_ex_tax":7546,
          "pre_discount_line_items_total_inc_tax":9055,
          "total_discount_ex_tax":1500,
          "total_discount_inc_tax":1500,
          "order_discount_ex_tax":1500,
          "order_discount_inc_tax":1500
        },
        "fulfillment_status":"unfulfilled"
      },
      "relationships":{
        "line_items":{
          "links":{
            "self":"https://oms.shift.test/oms/v1/customer_orders/e94392c5-1565-48ac-be77-edea09d335c3/relationships/line_items",
            "related":"https://oms.shift.test/oms/v1/customer_orders/e94392c5-1565-48ac-be77-edea09d335c3/line_items"
          },
          "data":[
            {
              "type":"line_items",
              "id":"e94392c5-1565-48ac-be77-edea09d335c3_0"
            }
          ]
        },
        "shipping_methods":{
          "links":{
            "self":"https://oms.shift.test/oms/v1/customer_orders/e94392c5-1565-48ac-be77-edea09d335c3/relationships/shipping_methods",
            "related":"https://oms.shift.test/oms/v1/customer_orders/e94392c5-1565-48ac-be77-edea09d335c3/shipping_methods"
          },
          "data":[
            {
              "type":"shipping_methods",
              "id":"e94392c5-1565-48ac-be77-edea09d335c3_4"
            }
          ]
        },
        "shipping_addresses":{
          "links":{
            "self":"https://oms.shift.test/oms/v1/customer_orders/e94392c5-1565-48ac-be77-edea09d335c3/relationships/shipping_addresses",
            "related":"https://oms.shift.test/oms/v1/customer_orders/e94392c5-1565-48ac-be77-edea09d335c3/shipping_addresses"
          },
          "data":[
            {
              "type":"shipping_addresses",
              "id":"e94392c5-1565-48ac-be77-edea09d335c3_1"
            }
          ]
        },
        "billing_addresses":{
          "links":{
            "self":"https://oms.shift.test/oms/v1/customer_orders/e94392c5-1565-48ac-be77-edea09d335c3/relationships/billing_addresses",
            "related":"https://oms.shift.test/oms/v1/customer_orders/e94392c5-1565-48ac-be77-edea09d335c3/billing_addresses"
          },
          "data":[
            {
              "type":"billing_addresses",
              "id":"e94392c5-1565-48ac-be77-edea09d335c3_1"
            }
          ]
        },
        "discounts":{
          "links":{
            "self":"https://oms.shift.test/oms/v1/customer_orders/e94392c5-1565-48ac-be77-edea09d335c3/relationships/discounts",
            "related":"https://oms.shift.test/oms/v1/customer_orders/e94392c5-1565-48ac-be77-edea09d335c3/discounts"
          },
          "data":[

          ]
        }
      }
    }
  ],
  "included":[
    {
      "id":"9f736e9a-0ffa-404d-bfd3-1bea4276a3fa",
      "type":"customers",
      "links":{
        "self":"https://oms.shift.test/oms/v1/customers/9f736e9a-0ffa-404d-bfd3-1bea4276a3fa"
      },
      "attributes":{
        "reference":"1",
        "email":"test@test.com",
        "name":"Test User",
        "meta_attributes":{

        }
      }
    },
    {
      "id":"e94392c5-1565-48ac-be77-edea09d335c3",
      "type":"customers",
      "links":{
        "self":"https://oms.shift.test/oms/v1/customers/e94392c5-1565-48ac-be77-edea09d335c3"
      },
      "attributes":{
        "reference":"1",
        "email":"test@test.com",
        "name":"Test User",
        "meta_attributes":{

        }
      }
    },
    {
      "id":"9f736e9a-0ffa-404d-bfd3-1bea4276a3fa_0",
      "type":"line_items",
      "links":{
        "self":"https://oms.shift.test/oms/v1/line_items/9f736e9a-0ffa-404d-bfd3-1bea4276a3fa_0"
      },
      "attributes":{
        "title":"Product 5 - Small Granite Knife - Variant 2 for Product 5 - Small Granite Knife",
        "quantity":1,
        "sku":"5879215469392",
        "pricing":{
          "each_ex_tax":5709,
          "each_inc_tax":6851,
          "line_total_ex_tax":5709,
          "line_total_inc_tax":6851,
          "line_discount_ex_tax":0,
          "line_discount_inc_tax":0,
          "pre_discount_line_total_ex_tax":5709,
          "pre_discount_line_total_inc_tax":6851,
          "tax_rate":20
        },
        "image_urls":[
          "https://shift-platform-dev-assets.s3-eu-west-1.amazonaws.com/uploads/asset_file/asset_file/5/1561548220.4408648-15.jpg"
        ]
      },
      "relationships":{
        "shipping_method":{
          "links":{
            "self":"https://oms.shift.test/oms/v1/line_items/9f736e9a-0ffa-404d-bfd3-1bea4276a3fa_0/relationships/shipping_method",
            "related":"https://oms.shift.test/oms/v1/line_items/9f736e9a-0ffa-404d-bfd3-1bea4276a3fa_0/shipping_method"
          },
          "data":{
            "type":"shipping_methods",
            "id":"9f736e9a-0ffa-404d-bfd3-1bea4276a3fa_3"
          }
        },
        "shipping_address":{
          "links":{
            "self":"https://oms.shift.test/oms/v1/line_items/9f736e9a-0ffa-404d-bfd3-1bea4276a3fa_0/relationships/shipping_address",
            "related":"https://oms.shift.test/oms/v1/line_items/9f736e9a-0ffa-404d-bfd3-1bea4276a3fa_0/shipping_address"
          },
          "data":{
            "type":"shipping_addresses",
            "id":"9f736e9a-0ffa-404d-bfd3-1bea4276a3fa_1"
          }
        },
        "discounts":{
          "links":{
            "self":"https://oms.shift.test/oms/v1/line_items/9f736e9a-0ffa-404d-bfd3-1bea4276a3fa_0/relationships/discounts",
            "related":"https://oms.shift.test/oms/v1/line_items/9f736e9a-0ffa-404d-bfd3-1bea4276a3fa_0/discounts"
          },
          "data":[

          ]
        }
      }
    },
    {
      "id":"e94392c5-1565-48ac-be77-edea09d335c3_0",
      "type":"line_items",
      "links":{
        "self":"https://oms.shift.test/oms/v1/line_items/e94392c5-1565-48ac-be77-edea09d335c3_0"
      },
      "attributes":{
        "title":"Product 4 - Incredible Wooden Car - Variant 1 for Product 4 - Incredible Wooden Car",
        "quantity":1,
        "sku":"6170377133251",
        "pricing":{
          "each_ex_tax":7546,
          "each_inc_tax":9055,
          "line_total_ex_tax":7546,
          "line_total_inc_tax":9055,
          "line_discount_ex_tax":0,
          "line_discount_inc_tax":0,
          "pre_discount_line_total_ex_tax":7546,
          "pre_discount_line_total_inc_tax":9055,
          "tax_rate":20
        },
        "image_urls":[
          "https://shift-platform-dev-assets.s3-eu-west-1.amazonaws.com/uploads/asset_file/asset_file/4/1561548220.1977956-14.jpg"
        ]
      },
      "relationships":{
        "shipping_method":{
          "links":{
            "self":"https://oms.shift.test/oms/v1/line_items/e94392c5-1565-48ac-be77-edea09d335c3_0/relationships/shipping_method",
            "related":"https://oms.shift.test/oms/v1/line_items/e94392c5-1565-48ac-be77-edea09d335c3_0/shipping_method"
          },
          "data":{
            "type":"shipping_methods",
            "id":"e94392c5-1565-48ac-be77-edea09d335c3_4"
          }
        },
        "shipping_address":{
          "links":{
            "self":"https://oms.shift.test/oms/v1/line_items/e94392c5-1565-48ac-be77-edea09d335c3_0/relationships/shipping_address",
            "related":"https://oms.shift.test/oms/v1/line_items/e94392c5-1565-48ac-be77-edea09d335c3_0/shipping_address"
          },
          "data":{
            "type":"shipping_addresses",
            "id":"e94392c5-1565-48ac-be77-edea09d335c3_1"
          }
        },
        "discounts":{
          "links":{
            "self":"https://oms.shift.test/oms/v1/line_items/e94392c5-1565-48ac-be77-edea09d335c3_0/relationships/discounts",
            "related":"https://oms.shift.test/oms/v1/line_items/e94392c5-1565-48ac-be77-edea09d335c3_0/discounts"
          },
          "data":[

          ]
        }
      }
    },
    {
      "id":"9f736e9a-0ffa-404d-bfd3-1bea4276a3fa_3",
      "type":"shipping_methods",
      "links":{
        "self":"https://oms.shift.test/oms/v1/shipping_methods/9f736e9a-0ffa-404d-bfd3-1bea4276a3fa_3"
      },
      "attributes":{
        "label":"Next Day",
        "price":1000
      }
    },
    {
      "id":"e94392c5-1565-48ac-be77-edea09d335c3_4",
      "type":"shipping_methods",
      "links":{
        "self":"https://oms.shift.test/oms/v1/shipping_methods/e94392c5-1565-48ac-be77-edea09d335c3_4"
      },
      "attributes":{
        "label":"Standard",
        "price":1500
      }
    },
    {
      "id":"9f736e9a-0ffa-404d-bfd3-1bea4276a3fa_1",
      "type":"shipping_addresses",
      "links":{
        "self":"https://oms.shift.test/oms/v1/shipping_addresses/9f736e9a-0ffa-404d-bfd3-1bea4276a3fa_1"
      },
      "attributes":{
        "name":"Test User",
        "company":null,
        "lines":[
          "1 Test Drive",
          "Leeds"
        ],
        "city":"Leeds",
        "state":"West Yorkshire",
        "postcode":"WF4 1TD",
        "country":"GB"
      }
    },
    {
      "id":"e94392c5-1565-48ac-be77-edea09d335c3_1",
      "type":"shipping_addresses",
      "links":{
        "self":"https://oms.shift.test/oms/v1/shipping_addresses/e94392c5-1565-48ac-be77-edea09d335c3_1"
      },
      "attributes":{
        "name":"Test User",
        "company":null,
        "lines":[
          "1 Test Drive",
          "Leeds"
        ],
        "city":"Leeds",
        "state":"West Yorkshire",
        "postcode":"WF4 1TD",
        "country":"GB"
      }
    },
    {
      "id":"9f736e9a-0ffa-404d-bfd3-1bea4276a3fa_1",
      "type":"billing_addresses",
      "links":{
        "self":"https://oms.shift.test/oms/v1/billing_addresses/9f736e9a-0ffa-404d-bfd3-1bea4276a3fa_1"
      },
      "attributes":{
        "name":"Test User",
        "company":null,
        "lines":[
          "1 Test Drive",
          "Leeds"
        ],
        "city":"Leeds",
        "state":"West Yorkshire",
        "postcode":"WF4 1TD",
        "country":"GB"
      }
    },
    {
      "id":"e94392c5-1565-48ac-be77-edea09d335c3_1",
      "type":"billing_addresses",
      "links":{
        "self":"https://oms.shift.test/oms/v1/billing_addresses/e94392c5-1565-48ac-be77-edea09d335c3_1"
      },
      "attributes":{
        "name":"Test User",
        "company":null,
        "lines":[
          "1 Test Drive",
          "Leeds"
        ],
        "city":"Leeds",
        "state":"West Yorkshire",
        "postcode":"WF4 1TD",
        "country":"GB"
      }
    }
  ],
  "links":{
    "first":"https://oms.shift.test/oms/v1/customer_orders?fields%5Bbilling_addresses%5D=name%2Ccompany%2Clines%2Ccity%2Cstate%2Cpostcode%2Ccountry&fields%5Bcustomer_orders%5D=account_reference%2Creference%2Cplaced_at%2Cline_items%2Cpricing%2Cshipping_methods%2Cshipping_addresses%2Cdiscounts%2Cfulfillment_status%2Cbilling_addresses&fields%5Bdiscounts%5D=label%2Camount_inc_tax%2Ccoupon_code&fields%5Bline_items%5D=title%2Cquantity%2Csku%2Cpricing%2Cshipping_method%2Cshipping_address%2Cdiscounts%2Cimage_urls&fields%5Bshipping_addresses%5D=name%2Ccompany%2Clines%2Ccity%2Cstate%2Cpostcode%2Ccountry&fields%5Bshipping_methods%5D=label%2Cprice&filter%5Baccount_reference%5D=shift&filter%5Bcustomer_reference%5D=1&include=customer%2Cshipping_methods%2Cshipping_addresses%2Cdiscounts%2Cline_items%2Cline_items.shipping_method%2Cline_items.shipping_address%2Cline_items.discounts%2Cbilling_addresses&page%5Blimit%5D=2&page%5Boffset%5D=0&sort=-placed_at",
    "next":"https://oms.shift.test/oms/v1/customer_orders?fields%5Bbilling_addresses%5D=name%2Ccompany%2Clines%2Ccity%2Cstate%2Cpostcode%2Ccountry&fields%5Bcustomer_orders%5D=account_reference%2Creference%2Cplaced_at%2Cline_items%2Cpricing%2Cshipping_methods%2Cshipping_addresses%2Cdiscounts%2Cfulfillment_status%2Cbilling_addresses&fields%5Bdiscounts%5D=label%2Camount_inc_tax%2Ccoupon_code&fields%5Bline_items%5D=title%2Cquantity%2Csku%2Cpricing%2Cshipping_method%2Cshipping_address%2Cdiscounts%2Cimage_urls&fields%5Bshipping_addresses%5D=name%2Ccompany%2Clines%2Ccity%2Cstate%2Cpostcode%2Ccountry&fields%5Bshipping_methods%5D=label%2Cprice&filter%5Baccount_reference%5D=shift&filter%5Bcustomer_reference%5D=1&include=customer%2Cshipping_methods%2Cshipping_addresses%2Cdiscounts%2Cline_items%2Cline_items.shipping_method%2Cline_items.shipping_address%2Cline_items.discounts%2Cbilling_addresses&page%5Blimit%5D=2&page%5Boffset%5D=2&sort=-placed_at",
    "last":"https://oms.shift.test/oms/v1/customer_orders?fields%5Bbilling_addresses%5D=name%2Ccompany%2Clines%2Ccity%2Cstate%2Cpostcode%2Ccountry&fields%5Bcustomer_orders%5D=account_reference%2Creference%2Cplaced_at%2Cline_items%2Cpricing%2Cshipping_methods%2Cshipping_addresses%2Cdiscounts%2Cfulfillment_status%2Cbilling_addresses&fields%5Bdiscounts%5D=label%2Camount_inc_tax%2Ccoupon_code&fields%5Bline_items%5D=title%2Cquantity%2Csku%2Cpricing%2Cshipping_method%2Cshipping_address%2Cdiscounts%2Cimage_urls&fields%5Bshipping_addresses%5D=name%2Ccompany%2Clines%2Ccity%2Cstate%2Cpostcode%2Ccountry&fields%5Bshipping_methods%5D=label%2Cprice&filter%5Baccount_reference%5D=shift&filter%5Bcustomer_reference%5D=1&include=customer%2Cshipping_methods%2Cshipping_addresses%2Cdiscounts%2Cline_items%2Cline_items.shipping_method%2Cline_items.shipping_address%2Cline_items.discounts%2Cbilling_addresses&page%5Blimit%5D=2&page%5Boffset%5D=3&sort=-placed_at"
  }
}
