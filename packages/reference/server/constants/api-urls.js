// External Endpoints

module.exports = {
  platform: {
    CategoryUrl: `/${process.env.API_TENANT}/v1/category_trees/reference:web/categories`,
    AccountUrl: `${process.env.API_TENANT}/v1/customer_accounts`,
    CreateOrderUrl: `/${process.env.API_TENANT}/v2/create_order`,
    LoginUrl: `${process.env.API_TENANT}/v1/customer_account_authentications`,
    MenuUrl: `${process.env.API_TENANT}/v1/menus`,
    PageUrl: `${process.env.API_TENANT}/v1/static_pages`,
    ProductUrl: `${process.env.API_TENANT}/v1/products`,
    SlugUrl: `${process.env.API_TENANT}/v1/slugs`
  },
  oms: {
    customerOrdersUrl: `oms/v1/customer_orders`
  }
}
