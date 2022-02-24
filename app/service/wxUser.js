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
  async getCurrentUser(openId) {
    const { ctx } = this
    const user = await ctx.model.WxUser.findOne({
      where: {
        openId,
      },
    })
    if (user) {
      user.phone = ctx.helper.fluzzPhone(user.phone)
      return this.success(user, '查询成功')
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
  async wxLogin(body) {
    const { ctx } = this
    const {openId} = body
    const wxUser = await ctx.model.WxUser.findOne({
      where: {
        openId
      }
    })
    if (!wxUser) {
      return this.error(null, '该用户尚未注册！')
    }
    await ctx.cookies.set('uid', wxUser.id, {
      httpOnly: true,
      encrypt: true
    })
    return this.success(wxUser, '登录成功！')
  }
  async register(body) {
    const { ctx } = this
    const { phone } = body
    console.log(1)
    const [wxUser, created] = await ctx.model.WxUser.findOrCreate({
      where: {
        phone
      },
      defaults: body,
      fields: ['openId', 'shareOpenId', 'name', 'useImage', 'phone', 'sex']
    })
    if (!created) {
      return this.error(null, '该用户已存在！')
    }
    return this.success(wxUser, '恭喜你，注册成功！')
  }
  async takeCollect(userId) {
    const { ctx } = this
    const wxUserId = this.getWxUserId()
    const [_, created] = await ctx.model.UserWxUser.findOrCreate({
      where: {
        userId,
        wxUserId
      },
      defaults: {
        userId,
        wxUserId
      },
    })
    if (!created) {
      return this.error(null, '已收藏，不能重复收藏！')
    }
    return this.success(null, '收藏成功！')
  }
  async cancelCollect(userId) {
    const { ctx } = this
    const wxUserId = this.getWxUserId()
    const wxUser = await ctx.model.WxUser.findByPk(wxUserId)
    await wxUser.removeUser(userId)
    return this.success(null, '取消成功！')
  }
  async batchCancelCollect(userIds) {
    const { ctx } = this
    const wxUserId = this.getWxUserId()
    const wxUser = await ctx.model.WxUser.findByPk(wxUserId)
    await wxUser.removeUsers(userIds)
    return this.success(null, '批量取消成功！')
  }
  async getCollectionList(query) {
    const { ctx } = this
    const {limit,offset} = query
    const { count, rows } = await ctx.model.User.findAndCountAll(query)
    let hasMore = true
    if(rows.length < limit) {
      hasMore = false
    } else {
      let len = limit * offset
      if (len >= count) {
        hasMore = false
      }
    }
    const res = this.success(rows, '查询成功！')
    return {
      ...res,
      hasMore,
      success: true,
    }
  }
  
}

module.exports = WxUserService
