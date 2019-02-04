const shiftAccountHandler = require('./express/account-handler')
const shiftMenuHandler = require('./express/menu-handler')

module.exports = {
  shiftRoutes: (server) => {
    server.get('/getAccount', shiftAccountHandler.getAccount)
    server.get('/getMenus', shiftMenuHandler.getMenu)
  }
}
