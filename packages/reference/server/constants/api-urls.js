// External Endpoints

module.exports = {
  platform: {
    CategoryUrl: `/${process.env.API_TENANT}/v1/category_trees/reference:web/categories`,
    RegisterUrl: `${process.env.API_TENANT}/v1/customer_accounts`,
    CreateOrderUrl: `/${process.env.API_TENANT}/v2/create_order`,
    LoginUrl: `${process.env.API_TENANT}/v1/customer_account_authentications`,
    MenuUrl: `${process.env.API_TENANT}/v1/menus`,
    PageUrl: `${process.env.API_TENANT}/v1/static_pages`,
    ProductUrl: `${process.env.API_TENANT}/v1/products`,
    SlugUrl: `${process.env.API_TENANT}/v1/slugs`
  },
  oms: {
    orderHistoryUrl: `oms/v1/order_histories`
  }
}
