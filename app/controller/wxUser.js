const CommonController = require('./common')
class WxUserController extends CommonController {
  async addOrUpdateUser() {
    const ctx = this.ctx
    ctx.body = await ctx.service.wxUser.addOrUpdateUser(ctx.request.body)
  }
  async getCurrentUser() {
    const ctx = this.ctx
    ctx.body = await ctx.service.wxUser.getCurrentUser(ctx.query.openId)
  }
  async openVip() {
    const ctx = this.ctx
    ctx.body = await ctx.service.wxUser.openVip(ctx.request.body)
  }
  async wxLogin() {
    const { ctx } = this
    ctx.body = await ctx.service.wxUser.wxLogin(ctx.request.body)
  }
  async register() {
    console.log(1)
    const { ctx } = this
    ctx.body = await ctx.service.wxUser.register(ctx.request.body)
  }
  async getAccessToken() {
    const { ctx } = this
    ctx.body = await ctx.helper.getAccessToken()
  }
  async takeCollect() {
    const { ctx } = this
    const {userId, wxUserId} = ctx.request.body
    if (userId == undefined || wxUserId == undefined) {
      ctx.body = this.error(null, "参数有误！")
      return
    }
    ctx.body = await ctx.service.wxUser.takeCollect(ctx.request.body)
  }
  async cancelCollect() {
    const { ctx } = this
    const {userId, wxUserId} = ctx.request.body
    if (userId == undefined || wxUserId == undefined) {
      ctx.body = this.error(null, "参数有误！")
      return
    }
    ctx.body = await ctx.service.wxUser.cancelCollect(ctx.request.body)
  }
  async batchCancelCollect() {
    const { ctx } = this
    const {userIds = [], wxUserId} = ctx.request.body
    if (!userIds.length || wxUserId == undefined) {
      ctx.body = this.error(null, "参数有误！")
      return
    }
    ctx.body = await ctx.service.wxUser.batchCancelCollect(ctx.request.body)
  }
  async getCollectionList() {
    const ctx = this.ctx
    let { limit, offset } = this.getPageQuery()
    const query = {
      limit,
      offset,
    }
    ctx.body = await ctx.service.wxUser.getCollectionList(query)
  }
  
  
}

module.exports = WxUserController
