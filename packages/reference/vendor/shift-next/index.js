const shiftAccountHandler = require('./express/account-handler')

module.exports = {
  shiftRoutes: (server) => {
    server.get('/getAccount', shiftAccountHandler.getAccount)
  }
}
