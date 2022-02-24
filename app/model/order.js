'use strict'
const uuid = require('uuid').v4
module.exports = (app) => {
  const { STRING, INTEGER, UUID, BOOLEAN, DATE } = app.Sequelize
  const Order = app.model.define('order', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: () => {
        return uuid().replace(/-/g, '')
      },
    },
    money: {
      type: STRING(4),
      allowNull: false,
      comment: '金额',
      validate: {
        notEmpty: {
          msg: '金额不能为空',
        },
      },
    },
    status: {
      type: STRING(1),
      comment: '订单状态 0-未支付 1-支付失败 2-支付成功 3-取消支付',
      defaultValue: '0'
    }

  })
  return Order
}
