const CommonController = require('./common')
class WxUserController extends CommonController {
  async addOrUpdateUser() {
    const ctx = this.ctx
    ctx.body = await ctx.service.wxUser.addOrUpdateUser(ctx.request.body)
  }
  async getUser() {
    const ctx = this.ctx
    ctx.body = await ctx.service.wxUser.getUser(ctx.params.openId)
  }
  async openVip() {
    const ctx = this.ctx
    ctx.body = await ctx.service.wxUser.openVip(ctx.request.body)
  }
}

module.exports = WxUserController
