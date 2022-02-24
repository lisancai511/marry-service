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
}

module.exports = WxUserController
