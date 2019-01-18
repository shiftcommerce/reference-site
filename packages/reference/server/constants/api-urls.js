// External Endpoints

module.exports = {
  platform: {
    AddressBookUrl: `${process.env.API_TENANT}/v1/customer_accounts/:customer_account_id/addresses`,
    AddToCartUrl: cartId => `${process.env.API_TENANT}/v1/carts/${cartId}/line_items`,
    AddressUrl: `${process.env.API_TENANT}/v1/addresses/:address_id`,
    AddressesUrl: `${process.env.API_TENANT}/v1/addresses`,
    CategoryUrl: `/${process.env.API_TENANT}/v1/category_trees/reference:web/categories`,
    AccountUrl: `${process.env.API_TENANT}/v1/customer_accounts`,
    CartByIdUrl: cartId => `${process.env.API_TENANT}/v1/carts/${cartId}`,
    CartCouponsUrl: cartId => `${process.env.API_TENANT}/v1/carts/${cartId}/coupons`,
    CartUrl: `${process.env.API_TENANT}/v1/carts`,
    CreateOrderUrl: `${process.env.API_TENANT}/v2/create_order`,
    CustomerAccountUrl: customerAccountId => `${process.env.API_TENANT}/v1/customer_accounts/${customerAccountId}`,
    LineItemUrl: (cartId, lineItemId) => `${process.env.API_TENANT}/v1/carts/${cartId}/line_items/${lineItemId}`,
    LoginUrl: `${process.env.API_TENANT}/v1/customer_account_authentications`,
    MenuUrl: `${process.env.API_TENANT}/v1/menus`,
    PageUrl: `${process.env.API_TENANT}/v1/static_pages`,
    ProductUrl: `${process.env.API_TENANT}/v1/products`,
    ShippingMethodsUrl: `${process.env.API_TENANT}/v1/shipping_methods`,
    SlugUrl: `${process.env.API_TENANT}/v1/slugs`
  },
  oms: {
    customerOrdersUrl: `oms/v1/customer_orders`
  }
}
