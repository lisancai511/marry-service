const CommonController = require('./common')
class UploadImgController extends CommonController {
  async index() {
    const ctx = this.ctx
    let { limit, offset, authName } = this.getPageQuery()
    const { Op } = this.app.Sequelize
    const where = {
      authName: {
        [Op.startsWith]: authName || '',
      },
    }
    const query = {
      limit,
      offset,
      where,
      order: [
        ['createdAt', 'DESC'],
        ['authName', 'ASC'],
      ],
    }
    ctx.body = await ctx.service.uploadImg.list(query)
  }

  async show() {
    const ctx = this.ctx
    ctx.body = await ctx.service.uploadImg.detail(ctx.params.id)
  }

  async create() {
    const ctx = this.ctx
    let { body } = ctx.request
    ctx.body = await ctx.service.uploadImg.create(body)
  }

  async update() {
    const ctx = this.ctx
    let { body } = ctx.request
    ctx.body = await ctx.service.uploadImg.update(ctx.params.id, body)
  }

  async destroy() {
    const ctx = this.ctx
    ctx.body = await ctx.service.uploadImg.destroy(ctx.params.id)
  }
  async getAllAuth() {
    const ctx = this.ctx
    ctx.body = await ctx.service.uploadImg.getAllAuth()
  }
  async uploadFile111() {
    console.log('in')
    const ctx = this.ctx
    const files = ctx.request.files
    ctx.body = await ctx.service.uploadImg.uploadFile(files)
  }

  async getUserInfo() {
    const ctx = this.ctx
    const data = await ctx.curl(
      'http://zzcc.yijiehunlian.com/index/lists2.html',
      {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Cookie: 'PHPSESSID=gf5qa85tju3vav2qrnin1eprd1',
        },
        dataType: 'json',
      }
    )
    console.log(data.res.data.data.data)
    ctx.body = {
      code: 0,
      data: data.res.data.data.data,
    }
  }
}

module.exports = UploadImgController
