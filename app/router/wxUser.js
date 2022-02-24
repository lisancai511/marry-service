module.exports = (app) => {
  const { router, controller, jwt } = app
  router.post('/api/wxLogin', controller.wxUser.wxLogin)
  router.post('/api/register', controller.wxUser.register)
  router.get('/api/getCurrentUser', controller.wxUser.getCurrentUser)
}
