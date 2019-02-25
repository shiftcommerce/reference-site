// Next Pages
import CartPage from './pages/cart'
import ForgottenPasswordPage from './pages/forgotten-password'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import OfflinePage from './pages/offline'
import SlugPage from './pages/slug'
import StaticPage from './pages/static-page'
import ProductPage from './pages/product'
import MyAccountPage from './pages/my-account'

// Express handlers
import shiftAccountHandler from './express/account-handler'
import shiftCartHandler from './express/cart-handler'
import shiftCategoryHandler from './express/category-handler'
import shiftProductHandler from './express/product-handler'
import shiftMenuHandler from './express/menu-handler'
import shiftSlugHandler from './express/slug-handler'
import shiftStaticPageHandler from './express/staticpage-handler'
import shiftAddressBookHandler from './express/addressbook-handler'

// Lib
import Config from './lib/config'

module.exports = {
  shiftRoutes: (server) => {
    server.get('/getAccount', shiftAccountHandler.getAccount)
    server.get('/getAddressBook', shiftAddressBookHandler.getAddressBook)
    server.get('/getMenus', shiftMenuHandler.getMenu)
    server.get('/getCart', shiftCartHandler.getCart)
    server.get('/getCategory/:id', shiftCategoryHandler.getCategory)
    server.get('/getProduct/:id', shiftProductHandler.getProductById)
    server.get('/getShippingMethods', shiftCartHandler.getShippingMethods)
    server.get('/customerOrders', shiftAccountHandler.getCustomerOrders)
    server.post('/login', shiftAccountHandler.loginAccount)
    server.post('/register', shiftAccountHandler.registerAccount)
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

  CartPage: CartPage,
  StaticPage: StaticPage,
  ForgottenPasswordPage: ForgottenPasswordPage,
  LoginPage: LoginPage,
  RegisterPage: RegisterPage,
  OfflinePage: OfflinePage,
  SlugPage: SlugPage,
  ProductPage: ProductPage,
  MyAccountPage: MyAccountPage,

  shiftNextConfig: Config
}
