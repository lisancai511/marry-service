'use strict'

const CommenService = require('./common')
const WXBizDataCrypt = require('../utils/WXBizDataCrypt')

const md5 = require('../extend/md5')
class WxUserService extends CommenService {
  async addOrUpdateUser(body) {
    const { ctx } = this
    const { openId, shareOpenId, encryptedData, sessionKey, iv } = body
    if (openId.length === 28) {
      let User = await ctx.model.WxUser.findOne({
        where: {
          openId,
        },
        attributes: { exclude: ['vipFourCreate', 'vipOneCreate', 'createdAt'] },
      })
      if (encryptedData) {
        let pc = new WXBizDataCrypt('wx8e9499690d7c18ca', sessionKey)
        let data = pc.decryptData(encryptedData, iv)
        data.phoneNumber ? (body.phone = data.phoneNumber) : null
      }
      if (User) {
        if (User.vipOne) {
          let num = new Date() - User.vipOneCreate
          if (num > 77760000000) {
            await User.update({
              vipOne: false,
            })
          }
        }
        if (User.vipFour) {
          let num = new Date() - User.vipFourCreate
          if (num > 77760000000) {
            await User.update({
              vipFour: false,
            })
          }
        }
        await User.update(body, {
          fields: ['openId', 'name', 'useImage', 'phone', 'shareOpenId'],
        })
        return this.success(User, '修改成功')
      } else {
        User = await ctx.model.WxUser.create(body, {
          fields: ['openId', 'name', 'useImage', 'phone', 'shareOpenId'],
          attributes: {
            exclude: ['vipFourCreate', 'vipOneCreate', 'createdAt'],
          },
        })
      }
      const res = this.success(User, '添加成功')
      return {
        ...res,
        success: true,
      }
    } else {
      return {
        code: 1,
      }
    }
  }
  async getUser(openId) {
    const { ctx } = this
    const User = await ctx.model.WxUser.findOne({
      where: {
        openId,
      },
    })
    if (User) {
      const res = this.success(User, '查询成功')
      return {
        ...res,
        success: true,
      }
    }
    return this.error(null, '无当前数据，获取详情失败')
  }
  async openVip(body) {
    const { ctx } = this
    const { openid, type = 'one', time, sign } = body
    const key = `CHDtype=${type}PCDopenid=${openid}dkhtime=${time}`
    let newSign = md5(key)
    if (newSign == sign) {
      if (openid.length === 28) {
        let User = await ctx.model.WxUser.findOne({
          where: {
            openId: openid,
          },
        })
        let orderObj = {
          studentOpenId: openid,
          shareOpenId: User.shareOpenId,
          subjectType: type,
          orderStatus: 0,
        }
        await ctx.model.Order.create(orderObj)
        switch (type) {
          case 'one':
            await User.update({
              vipOne: true,
              vipOneCreate: new Date(),
            })
            break
          case 'four':
            await User.update({
              vipFour: true,
              vipFourCreate: new Date(),
            })
        }
        return this.success(User, '开通成功')
      } else {
        return {
          code: 1,
          msg: '用户不存在',
        }
      }
    } else {
      return {
        code: 1,
        msg: '用户不存在',
      }
    }
  }
}

module.exports = WxUserService
