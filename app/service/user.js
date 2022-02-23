'use strict'

const md5 = require('md5-node')
const CommenService = require('./common')
const fs = require('fs')
const http = require('http')
const axios = require('axios')

class UserService extends CommenService {
  async list(query) {
    const { ctx } = this
    const { count, rows } = await ctx.model.User.findAndCountAll(query)
    const res = this.success(rows, '查询成功！')
    return {
      ...res,
      total: count,
      success: true,
    }
  }

  async detail(id) {
    const { ctx } = this
    const user = await ctx.model.User.findByPk(id)
    if (user) {
      return this.success(user, '获取详情成功！')
    }
    return this.error(null, '无当前数据，获取详情失败！')
  }

  async create(placeId, body) {
    if (!placeId) return this.noPlace()
    const { ctx, app } = this
    const { Op } = app.Sequelize
    const { phone = '' } = body
    console.log(body)
    const [user, created] = await ctx.model.User.findOrCreate({
      where: {
        phone,
        placeId: placeId || '',
      },
      defaults: body,
      fields: [
        'name',
        'placeId',
        'phone',
        'password',
        'token',
        'status',
        'desc',
      ],
    })
    if (!created) {
      return this.error(null, '用户手机号已存在！')
    }
    return this.success(user, '创建成功！')
  }
  async update(id, placeId, body) {
    if (!placeId) return this.noPlace()
    const { ctx, app } = this
    const { phone } = body
    const user = await ctx.model.User.findByPk(id)
    if (user) {
      const hasUser = await ctx.model.User.findOne({
        where: {
          phone,
          placeId,
        },
      })
      if (hasUser && hasUser.id !== id) {
        return this.error(null, '用户已存在！')
      }
      await user.update(body, {
        fields: ['name', 'phone', 'status', 'desc'],
      })
      console.log(user.toJSON())
      return this.success(user, '修改成功！')
    }
    return this.error(null, '没有查询到当前数据，无法修改！')
  }
  async destroy(id) {
    const { ctx } = this
    const user = await ctx.model.User.findByPk(id)
    if (user) {
      await user.destroy()
      return this.success(null, '删除成功！')
    }
    return this.error(null, '删除失败，没有当前数据！')
  }

  async getCurrentUser() {
    const { ctx, app } = this
    const userId = (ctx.state.user && ctx.state.user.userId) || null
    const placeId = this.getPlaceId()
    if (userId) {
      const user = await ctx.model.User.getUser(placeId, userId)
      if (user) {
        return this.success(user, null)
      }
      return this.error(null, '没有当前用户信息，请联系管理员！')
    }
    return this.error(null, '没有当前用户信息，请联系管理员！')
  }

  async login(body) {
    const { ctx, app } = this
    const { phone, password } = body
    const users = await ctx.model.User.findAll({
      where: {
        phone,
        password: md5(password),
      },
      attributes: {
        exclude: ['password'],
      },
    })
    console.log(JSON.stringify(users, null, 2))
    if (users.length) {
      if (users.length === 1) {
        const user = users[0]
        const token = this.createToken(user.id)
        user.token = token
        await user.save()
        await user.reload()
        return this.success(user, null)
      }
      return this.success(users, null)
    }
    return this.error(null, '用户名或密码错误！')
  }
  async getAllUser() {
    const { ctx } = this
    let list = await ctx.model.User.findAll({
      where: this.wrapplaceId(),
      attributes: [
        ['id', 'value'],
        ['name', 'label'],
      ],
    })
    return this.success(list, null)
  }
  async createUserFromInter() {
    const { ctx } = this
    // for (let i = 0; i < 1000; i++) {
    //   try {
    //     const data = await ctx.curl(
    //       'http://zzcc.yijiehunlian.com/index/lists2.html',
    //       {
    //         method: 'POST',
    //         headers: {
    //           'X-Requested-With': 'XMLHttpRequest',
    //           Cookie: 'PHPSESSID=fb34ou055t160p6og660s3bbb6',
    //         },
    //         dataType: 'json',
    //         data: {
    //           page: i,
    //         },
    //       }
    //     )
    //     data.data.data.data.forEach(async (item) => {
    //       try {
    //         let obj = {
    //           ...item,
    //           originId: item.id,
    //         }
    //         delete obj.id
    //         await ctx.model.User.create(obj)
    //         console.log('创建成功')
    //       } catch (error) {
    //         console.log(error)
    //       }
    //     })
    //   } catch (error) {}
    // }

    return {
      code: 0,
      data: data,
    }
  }
  async saveImg() {
    // data.data.data.data.forEach(async (item) => {
    //   try {
    //     let res = await axios({
    //       url: item.upper,
    //       method: 'GET',
    //       responseType: 'stream',
    //     })
    //     console.log(res, 16444)
    //     await http.get(`${item.upper}`, (res) => {
    //       console.log(res, 16000)
    //       // 用来存储图片二进制编码
    //       let imgData = ''
    //       //设置图片编码格式
    //       res.setEncoding('binary')
    //       //检测请求的数据
    //       res.on('data', (chunk) => {
    //         imgData += chunk
    //       })
    //       //请求完成执行的回调
    //       res.on('end', async () => {
    //         // 通过文件流操作保存图片
    //         await fs.writeFile(
    //           `./public/image/${item.id}.jpg`,
    //           imgData,
    //           'binary',
    //           (error) => {
    //             if (error) {
    //               console.log('下载失败')
    //             } else {
    //               console.log('下载成功！' + Math.random())
    //             }
    //           }
    //         )
    //       })
    //     })
    //   } catch (error) {
    //     console.log(error)
    //   }
    // })
    const { ctx } = this
    const { count, rows } = await ctx.model.User.findAndCountAll()
    let arr = []
    rows.forEach(async (item) => {
      try {
        await http.get(`${item.upper}`, (res) => {
          // 用来存储图片二进制编码
          let imgData = ''
          //设置图片编码格式
          res.setEncoding('binary')
          //检测请求的数据
          res.on('data', (chunk) => {
            imgData += chunk
          })
          //请求完成执行的回调
          res.on('end', async () => {
            // 通过文件流操作保存图片
            await fs.writeFile(
              `./public/image/${item.id}_upper.jpg`,
              imgData,
              'binary',
              (error) => {
                if (error) {
                  console.log('下载失败')
                } else {
                  console.log('下载成功！' + Math.random() + '_upper')
                }
              }
            )
          })
        })
      } catch (error) {
        arr.push(1)
      }
      try {
        await http.get(`${item.body}`, (res) => {
          // 用来存储图片二进制编码
          let imgData = ''
          //设置图片编码格式
          res.setEncoding('binary')
          //检测请求的数据
          res.on('data', (chunk) => {
            imgData += chunk
          })
          //请求完成执行的回调
          res.on('end', async () => {
            // 通过文件流操作保存图片
            await fs.writeFile(
              `./public/image/${item.id}_body.jpg`,
              imgData,
              'binary',
              (error) => {
                if (error) {
                  console.log('下载失败')
                } else {
                  console.log('下载成功！' + Math.random() + '_body')
                }
              }
            )
          })
        })
      } catch (error) {
        arr.push(3)
      }

      try {
        await http.get(`${item.avatar}`, (res) => {
          // 用来存储图片二进制编码
          let imgData = ''
          //设置图片编码格式
          res.setEncoding('binary')
          //检测请求的数据
          res.on('data', (chunk) => {
            imgData += chunk
          })
          //请求完成执行的回调
          res.on('end', async () => {
            // 通过文件流操作保存图片
            await fs.writeFile(
              `./public/image/${item.id}_avatar.jpg`,
              imgData,
              'binary',
              (error) => {
                if (error) {
                  console.log('下载失败')
                } else {
                  console.log('下载成功！' + Math.random() + '_avatar')
                }
              }
            )
          })
        })
      } catch (error) {
        arr.push(4)
      }
      try {
        await http.get(`${item.headimgurl}`, (res) => {
          // 用来存储图片二进制编码
          let imgData = ''
          //设置图片编码格式
          res.setEncoding('binary')
          //检测请求的数据
          res.on('data', (chunk) => {
            imgData += chunk
          })
          //请求完成执行的回调
          res.on('end', async () => {
            // 通过文件流操作保存图片
            await fs.writeFile(
              `./public/image/${item.id}_headimgurl.jpg`,
              imgData,
              'binary',
              (error) => {
                if (error) {
                  console.log('下载失败')
                } else {
                  console.log('下载成功！' + Math.random())
                }
              }
            )
          })
        })
      } catch (error) {
        arr.push(2)
      }
    })
    return {
      code: 0,
      data: arr,
    }
  }
  async getWx() {
    const { ctx } = this
    let { count, rows } = await ctx.model.User.findAndCountAll()
    let arr = []
    rows = rows.filter((item) => {
      return !item.wx_phone
    })
    await rows.forEach(async (item) => {
      try {
        let data = await ctx.curl(
          `http://zzcc.yijiehunlian.com/index/hqwx3/wuid/${item.id}.html`,
          {
            method: 'get',
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              Cookie: 'PHPSESSID=n1vvvai2tv2gj0qriblm44dq94',
            },
            dataType: 'json',
          }
        )
        try {
          let str = data.data.match(/value=.+"/g)
          item.wx_phone = str[0]
          await item.save()
        } catch (error) {}
      } catch (error) {}
    })
    return {
      code: 0,
      data: arr,
    }
  }
}

module.exports = UserService
