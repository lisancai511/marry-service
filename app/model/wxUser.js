'use strict'
const uuid = require('uuid').v4
module.exports = (app) => {
  const { STRING, INTEGER, UUID, BOOLEAN, DATE } = app.Sequelize
  const WxUser = app.model.define('wx_user', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: () => {
        return uuid().replace(/-/g, '')
      },
    },
    openId: {
      type: STRING(40),
      allowNull: false,
      comment: '微信openId',
      validate: {
        notEmpty: {
          msg: 'openId不能为空',
        },
      },
    },
    shareOpenId: {
      type: STRING(40),
      allowNull: true,
      comment: '分享者的openId',
    },
    name: {
      type: STRING(10),
      comment: '微信昵称',
    },
    useImage: {
      type: STRING(50),
      comment: '微信头像',
    },
    nickName: {
      type: STRING(6),
      comment: '用户昵称',
    },
    phone: {
      type: STRING(11),
      allowNull: false,
      comment: '手机号码',
      validate: {
        notEmpty: {
          msg: '手机号码不能为空',
        },
      },
    },
    sex: {
      type: STRING(1),
      comment: '性别',
    }
  })
  return WxUser
}
