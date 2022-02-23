module.exports = (app) => {
  const { router, controller, jwt } = app
  router.resources('user', '/api/user', controller.user)
  router.get('/api/createUserFromInter', controller.user.createUserFromInter)
  router.get('/api/saveImg', controller.user.saveImg)
  router.get('/api/getWx', controller.user.getWx)
}
