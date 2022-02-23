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
    phone: {
      type: STRING(11),
      allowNull: true,
      comment: '手机号码',
    },
    studentId: {
      type: UUID,
      comment: '学生在驾校的id',
      allowNull: true,
    },
    vipOne: {
      type: BOOLEAN,
      comment: '科一是否是vip',
      allowNull: false,
      defaultValue: false,
    },
    vipOneCreate: {
      type: DATE,
      allowNull: true,
      comment: '科目一开始时间',
    },
    vipFour: {
      type: BOOLEAN,
      comment: '科四是否是vip',
      allowNull: false,
      defaultValue: false,
    },
    vipFourCreate: {
      type: DATE,
      allowNull: true,
      comment: '科目四开始时间',
    },
  })

  return WxUser
}
