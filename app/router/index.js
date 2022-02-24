'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app

  // router.post('/api/aaa', controller.uploadImg.uploadFile111)
  // router.get('/api/getUserInfo', controller.uploadImg.getUserInfo)
  router.post('/api/uploadFile', controller.upload.uploadFile)
  router.get('/api/getAccessToken', controller.wxUser.getAccessToken)
  require('./user')(app)
  require('./wxUser')(app)
}
