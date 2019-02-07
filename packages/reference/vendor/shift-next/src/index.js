import loginPage from './pages/login'

import shiftAccountHandler from './express/account-handler'
import shiftMenuHandler from './express/menu-handler'

import Config from './lib/config'

module.exports = {
  shiftRoutes: (server) => {
    server.get('/getAccount', shiftAccountHandler.getAccount)
    server.get('/getMenus', shiftMenuHandler.getMenu)
  },

  loginPage: loginPage,

  shiftNextConfig: Config
}
