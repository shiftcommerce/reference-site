// Next Pages
import CartPage from './pages/cart'
import CategoryPage from './pages/category'
import ForgottenPasswordPage from './pages/forgotten-password'
import LoginPage from './pages/login'
import MyAccountPage from './pages/my-account'
import OfflinePage from './pages/offline'
import ProductPage from './pages/product'
import RegisterPage from './pages/register'
import SearchPage from './pages/search'
import SlugPage from './pages/slug'
import StaticPage from './pages/static-page'

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
    server.get('/customerOrders', shiftAccountHandler.getCustomerOrders)
    server.get('/getAccount', shiftAccountHandler.getAccount)
    server.get('/getAddressBook', shiftAddressBookHandler.getAddressBook)
    server.get('/getCart', shiftCartHandler.getCart)
    server.get('/getCategory/:id', shiftCategoryHandler.getCategory)
    server.get('/getMenus', shiftMenuHandler.getMenu)
    server.get('/getProduct/:id', shiftProductHandler.getProductById)
    server.get('/getShippingMethods', shiftCartHandler.getShippingMethods)
    server.get('/getSlug', shiftSlugHandler.getSlug)
    server.get('/getStaticPage/:id', shiftStaticPageHandler.getStaticPage)
    server.post('/addCartCoupon', shiftCartHandler.addCartCoupon)
    server.post('/addToCart', shiftCartHandler.addToCart)
    server.post('/createAddress', shiftCartHandler.createAddress)
    server.post('/createAddressBookEntry', shiftAddressBookHandler.createAddressBookEntry)
    server.post('/deleteLineItem/:lineItemId', shiftCartHandler.deleteLineItem)
    server.post('/login', shiftAccountHandler.loginAccount)
    server.post('/register', shiftAccountHandler.registerAccount)
    server.post('/setCartBillingAddress', shiftCartHandler.setCartBillingAddress)
    server.post('/setCartShippingAddress', shiftCartHandler.setCartShippingAddress)
    server.post('/setShippingMethod', shiftCartHandler.setCartShippingMethod)
    server.post('/updateLineItem', shiftCartHandler.updateLineItem)
    server.delete('/deleteAddress/:addressId', shiftAddressBookHandler.deleteAddress)
  },

  CategoryPage: CategoryPage,
  CartPage: CartPage,
  ForgottenPasswordPage: ForgottenPasswordPage,
  ProductPage: ProductPage,
  LoginPage: LoginPage,
  MyAccountPage: MyAccountPage,
  OfflinePage: OfflinePage,
  RegisterPage: RegisterPage,
  SearchPage: SearchPage,
  SlugPage: SlugPage,
  StaticPage: StaticPage,

  shiftNextConfig: Config
}
