// External Endpoints
// Note: All external endpoints are expected to be listed here.
module.exports = {
  Host: process.env.API_HOST,
  CategoryUrl: `/${process.env.API_TENANT}/v1/menus`,
  ProductUrl: `/${process.env.API_TENANT}/v1/products`,
  CreateOrderUrl: `/${process.env.API_TENANT}/v1/create_order`
}
