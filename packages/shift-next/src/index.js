// Next Pages
import CartPage from './pages/cart'
import CategoryPage from './pages/category'
import ForgottenPasswordPage from './pages/forgotten-password'
import LoginPage from './pages/login'
import MyAccountPage from './pages/my-account'
import AccountDetailsPage from './pages/account/details'
import AccountPasswordPage from './pages/account/password'
import OfflinePage from './pages/offline'
import OrderPage from './pages/order'
import PasswordResetPage from './pages/password_reset'
import PaymentMethodPage from './pages/checkout/payment-method'
import PaymentPage from './pages/payment'
import ProductPage from './pages/product'
import RegisterPage from './pages/register'
import SearchPage from './pages/search'
import ShippingAddressPage from './pages/shipping-address'
import ShippingMethodPage from './pages/checkout/shipping-method'
import SlugPage from './pages/slug'
import StaticPage from './pages/static-page'
import { getSessionExpiryTime } from './lib/session'

// Components
import withCheckout from './components/with-checkout'

// Lib
import Config from './lib/config'
import { algoliaReduxWrapper, reduxWrapper } from './lib/algolia-redux-wrapper'
import renderComponents from './lib/render-components'

module.exports = {
  CategoryPage: CategoryPage,
  CartPage: CartPage,
  ForgottenPasswordPage: ForgottenPasswordPage,
  LoginPage: LoginPage,
  MyAccountPage: MyAccountPage,
  AccountDetailsPage: AccountDetailsPage,
  AccountPasswordPage: AccountPasswordPage,
  OfflinePage: OfflinePage,
  OrderPage: OrderPage,
  PasswordResetPage: PasswordResetPage,
  PaymentPage: PaymentPage,
  PaymentMethodPage: PaymentMethodPage,
  ProductPage: ProductPage,
  RegisterPage: RegisterPage,
  SearchPage: SearchPage,
  ShippingAddressPage: ShippingAddressPage,
  ShippingMethodPage: ShippingMethodPage,
  SlugPage: SlugPage,
  StaticPage: StaticPage,
  withCheckout: withCheckout,
  algoliaReduxWrapper,
  reduxWrapper,
  renderComponents,
  getSessionExpiryTime,
  shiftNextConfig: Config
}
