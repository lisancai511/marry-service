'use strict'
const uuid = require('uuid').v4
module.exports = (app) => {
  const { STRING, INTEGER, UUID, BOOLEAN, DATE } = app.Sequelize
  const UserWxuser = app.model.define('user_wxuser', {
    
  })
  return UserWxuser
}
