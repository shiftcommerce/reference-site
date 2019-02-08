// Pages
import forgottenPasswordPage from './pages/forgotten-password'
import loginPage from './pages/login'

// Express handlers
import shiftAccountHandler from './express/account-handler'
import shiftMenuHandler from './express/menu-handler'

// Lib
import Config from './lib/config'

module.exports = {
  shiftRoutes: (server) => {
    server.get('/getAccount', shiftAccountHandler.getAccount)
    server.get('/getMenus', shiftMenuHandler.getMenu)
  },

  forgottenPasswordPage: forgottenPasswordPage,
  loginPage: loginPage,

  shiftNextConfig: Config
}
