// Pages
import cartPage from './pages/cart'
import forgottenPasswordPage from './pages/forgotten-password'
import loginPage from './pages/login'
import RegisterPage from './pages/register'

// Express handlers
import shiftAccountHandler from './express/account-handler'
import shiftCartHandler from './express/cart-handler'
import shiftCategoryHandler from './express/category-handler'
import shiftProductHandler from './express/product-handler'
import shiftMenuHandler from './express/menu-handler'
import shiftSlugHandler from './express/slug-handler'
import shiftStaticPageHandler from './express/staticpage-handler'

// Lib
import Config from './lib/config'

module.exports = {
  shiftRoutes: (server) => {
    server.get('/getAccount', shiftAccountHandler.getAccount)
    server.get('/getMenus', shiftMenuHandler.getMenu)
    server.get('/getCart', shiftCartHandler.getCart)
    server.get('/getCategory/:id', shiftCategoryHandler.getCategory)
    server.get('/getProduct/:id', shiftProductHandler.getProductById)
    server.get('/getShippingMethods', shiftCartHandler.getShippingMethods)
    server.get('/getStaticPage/:id', shiftStaticPageHandler.getStaticPage)
    server.get('/getSlug', shiftSlugHandler.getSlug)
    server.post('/addToCart', shiftCartHandler.addToCart)
    server.post('/deleteLineItem/:lineItemId', shiftCartHandler.deleteLineItem)
    server.post('/updateLineItem', shiftCartHandler.updateLineItem)
    server.post('/addCartCoupon', shiftCartHandler.addCartCoupon)
    server.post('/createAddress', shiftCartHandler.createAddress)
    server.post('/setCartBillingAddress', shiftCartHandler.setCartBillingAddress)
    server.post('/setCartShippingAddress', shiftCartHandler.setCartShippingAddress)
    server.post('/setShippingMethod', shiftCartHandler.setCartShippingMethod)
  },

  cartPage: cartPage,
  forgottenPasswordPage: forgottenPasswordPage,
  loginPage: loginPage,
  RegisterPage: RegisterPage,

  shiftNextConfig: Config
}
