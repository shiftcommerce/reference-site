// Express handlers
const AccountHandler = require('./express/account-handler')
const CartHandler = require('./express/cart-handler')
const CategoryHandler = require('./express/category-handler')
const ProductHandler = require('./express/product-handler')
const MenuHandler = require('./express/menu-handler')
const OrderHandler = require('./express/order-handler')
const SlugHandler = require('./express/slug-handler')
const StaticPageHandler = require('./express/staticpage-handler')
const AddressBookHandler = require('./express/addressbook-handler')
const PayPalHandler = require('./express/paypal-handler')

// Routes
const AccountRoutes = require('./routes/account-routes.js')
const CheckoutRoutes = require('./routes/checkout-routes.js')
const OrderRoutes = require('./routes/order-routes.js')

// Shift-api Config
const { shiftApiConfig } =require('@shiftcommerce/shift-node-api')

shiftApiConfig.set({
  apiHost: process.env.API_HOST,
  apiTenant: process.env.API_TENANT,
  apiAccessToken: process.env.API_ACCESS_TOKEN
})

module.exports = {
  shiftRoutes: (server) => {
    server.get('/customerOrders', AccountHandler.getCustomerOrders)
    server.get('/getAccount', AccountHandler.getAccount)
    server.get('/getAddressBook', AddressBookHandler.getAddressBook)
    server.get('/getCart', CartHandler.getCart)
    server.get('/getCategory/:id', CategoryHandler.getCategory)
    server.get('/getMenus', MenuHandler.getMenu)
    server.get('/getProduct/:id', ProductHandler.getProductById)
    server.get('/getShippingMethods', CartHandler.getShippingMethods)
    server.get('/getSlug', SlugHandler.getSlug)
    server.get('/getStaticPage/:id', StaticPageHandler.getStaticPage)
    server.get('/forgotPassword', AccountHandler.requestForgotPasswordEmail)
    server.post('/passwordReset', AccountHandler.resetPassword)
    server.post('/addCartCoupon', CartHandler.addCartCoupon)
    server.post('/addToCart', CartHandler.addToCart)
    server.post('/createAddress', CartHandler.createAddress)
    server.post('/createAddressBookEntry', AddressBookHandler.createAddressBookEntry)
    server.post('/createOrder', OrderHandler.createOrder)
    server.post('/updateAddress/:addressId', AccountHandler.updateAddress)
    server.post('/deleteLineItem/:lineItemId', CartHandler.deleteLineItem)
    server.post('/login', AccountHandler.loginAccount)
    server.post('/register', AccountHandler.registerAccount)
    server.post('/setCartBillingAddress', CartHandler.setCartBillingAddress)
    server.post('/setCartShippingAddress', CartHandler.setCartShippingAddress)
    server.post('/setShippingMethod', CartHandler.setCartShippingMethod)
    server.post('/updateLineItem', CartHandler.updateLineItem)
    server.post('/updateCustomerAccount', AccountHandler.updateCustomerAccount)
    server.delete('/deleteAddress/:addressId', AddressBookHandler.deleteAddress)

    /**
     * Account Routes
     */
    server.get('/account/login', AccountRoutes.loginRoute)
    server.get('/account/myaccount', AccountRoutes.viewRoute)
    server.get('/account/register', AccountRoutes.registerRoute)
    server.get('/account/logout', AccountRoutes.logoutRoute)

    /**
     * Checkout Routes
     */
    server.get('/checkout/login', CheckoutRoutes.loginRoute)
    server.get('/checkout/review', CheckoutRoutes.reviewRoute)

    /**
     * PayPal Routes
     */
    server.post('/patchPayPalOrder', PayPalHandler.patchOrder)
    server.post('/authorizePayPalOrder', PayPalHandler.authorizeOrder)

    /**
     * Order Routes
     */
    server.get('/order', OrderRoutes.indexRoute)
  }
}
