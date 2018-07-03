// External Endpoints
// Note: All external endpoints are expected to be listed here.
module.exports = {
  MenuUrl: `/${process.env.API_TENANT}/v1/menus`,
  ProductUrl: `/${process.env.API_TENANT}/v1/products`,
  CreateOrderUrl: `/${process.env.API_TENANT}/v1/create_order`,
  CategoryUrl: `/${process.env.API_TENANT}/v1/products`,
  SlugUrl: `/${process.env.API_TENANT}/v1/slugs`,
  PageUrl: `/${process.env.API_TENANT}/v1/static_pages`
}
