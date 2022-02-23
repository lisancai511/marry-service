'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app

  router.post('/api/aaa', controller.uploadImg.uploadFile111)
  router.get('/api/getUserInfo', controller.uploadImg.getUserInfo)
  require('./user')(app)
}
