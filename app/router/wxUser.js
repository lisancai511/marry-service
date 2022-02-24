module.exports = (app) => {
  const { router, controller, jwt } = app
  router.post('/api/wxLogin', controller.wxUser.wxLogin)
  router.post('/api/register', controller.wxUser.register)
  router.get('/api/getCurrentUser', controller.wxUser.getCurrentUser)
  router.post('/api/takeCollect', controller.wxUser.takeCollect)
  router.post('/api/cancelCollect', controller.wxUser.cancelCollect)
  router.post('/api/batchCancelCollect', controller.wxUser.batchCancelCollect)
  router.get('/api/getCollectionList', controller.wxUser.getCollectionList)
}
