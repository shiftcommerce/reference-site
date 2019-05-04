// Express handlers
const shiftAccountHandler = require('./express/account-handler')
const shiftCartHandler = require('./express/cart-handler')
const shiftCategoryHandler = require('./express/category-handler')
const shiftProductHandler = require('./express/product-handler')
const shiftMenuHandler = require('./express/menu-handler')
const shiftOrderHandler = require('./express/order-handler')
const shiftSlugHandler = require('./express/slug-handler')
const shiftStaticPageHandler = require('./express/staticpage-handler')
const shiftAddressBookHandler = require('./express/addressbook-handler')
const shiftPayPalHandler = require('./express/paypal-handler')

// Routes
const shiftAccountRoutes = require('./routes/account-routes.js')
const shiftCheckoutRoutes = require('./routes/checkout-routes.js')
const shiftOrderRoutes = require('./routes/order-routes.js')

const getSessionExpiryTime = require('./lib/session')

// Shift-api Config
const { shiftApiConfig } =require('@shiftcommerce/shift-node-api')

shiftApiConfig.set({
  apiHost: process.env.API_HOST,
  apiTenant: process.env.API_TENANT,
  apiAccessToken: process.env.API_ACCESS_TOKEN
})

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
    server.get('/forgotPassword', shiftAccountHandler.requestForgotPasswordEmail)
    server.post('/passwordReset', shiftAccountHandler.resetPassword)
    server.post('/addCartCoupon', shiftCartHandler.addCartCoupon)
    server.post('/addToCart', shiftCartHandler.addToCart)
    server.post('/createAddress', shiftCartHandler.createAddress)
    server.post('/createAddressBookEntry', shiftAddressBookHandler.createAddressBookEntry)
    server.post('/createOrder', shiftOrderHandler.createOrder)
    server.post('/updateAddress/:addressId', shiftAccountHandler.updateAddress)
    server.post('/deleteLineItem/:lineItemId', shiftCartHandler.deleteLineItem)
    server.post('/login', shiftAccountHandler.loginAccount)
    server.post('/register', shiftAccountHandler.registerAccount)
    server.post('/setCartBillingAddress', shiftCartHandler.setCartBillingAddress)
    server.post('/setCartShippingAddress', shiftCartHandler.setCartShippingAddress)
    server.post('/setShippingMethod', shiftCartHandler.setCartShippingMethod)
    server.post('/updateLineItem', shiftCartHandler.updateLineItem)
    server.post('/updateCustomerAccount', shiftAccountHandler.updateCustomerAccount)
    server.delete('/deleteAddress/:addressId', shiftAddressBookHandler.deleteAddress)

    /**
     * Account Routes
     */
    server.get('/account/login', shiftAccountRoutes.loginRoute)
    server.get('/account/myaccount', shiftAccountRoutes.viewRoute)
    server.get('/account/register', shiftAccountRoutes.registerRoute)
    server.get('/account/logout', shiftAccountRoutes.logoutRoute)

    /**
     * Checkout Routes
     */
    server.get('/checkout/login', shiftCheckoutRoutes.loginRoute)
    server.get('/checkout/review', shiftCheckoutRoutes.reviewRoute)

    /**
     * PayPal Routes
     */
    server.post('/patchPayPalOrder', shiftPayPalHandler.patchOrder)
    server.post('/authorizePayPalOrder', shiftPayPalHandler.authorizeOrder)

    /**
     * Order Routes
     */
    server.get('/order', shiftOrderRoutes.indexRoute)
  },

  getSessionExpiryTime
}