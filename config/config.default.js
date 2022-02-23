/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

const path = require('path')
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  config.cluster = {
    listen: {
      path: '',
      port: 9527,
    },
    // https: {
    //   key: path.join(__dirname, '../app/utils/5446579_www.cwerp.top.key'), // https 证书绝对目录
    //   cert: path.join(__dirname, '../app/utils/5446579_www.cwerp.top.pem'), // https 证书绝对目录
    // },
  }
  config.bodyParser = {
    enable: true,
    encoding: 'utf8',
    formLimit: '30mb',
    jsonLimit: '30mb',
    strict: true,
    // @see https://github.com/hapijs/qs/blob/master/lib/parse.js#L8 for more options
    queryString: {
      arrayLimit: 100,
      depth: 5,
      parameterLimit: 1000,
    },
    enableTypes: ['json', 'form', 'text'],
    extendTypes: {
      text: ['text/xml', 'application/xml'],
    },
  }
  exports.sequelize = {
    dialect: 'mysql',
    host: '39.99.228.79',
    username: 'root',
    password: 'Wps097200.+',
    port: 3508,
    // database: 'errortest',
    database: 'marry',
    timezone: '+08:00',
    define: {
      underscored: true,
      freezeTableName: true,
    },
  }
  // exports.sequelize = {
  //   dialect: 'mysql',
  //   host: '10.213.134.254',
  //   username: 'root',
  //   password: 'www.2020',
  //   port: 3306,
  //   database: 'wps',
  //   timezone: '+08:00',
  //   define: {
  //     underscored: true,
  //     freezeTableName: true
  //   }
  // }
  // exports.sequelize = {
  //   dialect: 'mysql',
  //   host: 'ddns.lsjddw.cn',
  //   username: 'lsc',
  //   password: '15395833823',
  //   port: 23306,
  //   database: 'lsjddw-test',
  //   timezone: '+08:00',
  //   define: {
  //     underscored: true,
  //     freezeTableName: true
  //   }
  // }
  config.multipart = {
    mode: 'file',
    // fileExtensions: ['.bmp', '.png', '.gif', '.jpg', '.jpeg', '.wbmp', '.webp']
  }

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  }

  config.jwt = {
    secret: '123456', // 自定义 token 的加密条件字符串
    sign: {
      //jwt.sign(***,***,[options,***])方法中，options的默认设置可以在这里配置；
      expiresIn: 10, //多少s后过期。actionToken.js中,jwt.sing(plyload,secret,{expiresIn:number})会被合并，调用时设置优先级更高;
    },
  }
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['*'], // 允许访问接口的白名单
  }

  config.static = {
    prefix: '/',
    dir: process.cwd() + '/public',
  }

  config.rundir = process.cwd() + '/run'

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1577165435387_2425'

  // add your middleware config here
  config.middleware = ['check']

  exports.check = {
    match(ctx) {
      const { request } = ctx
      const { method, url } = request
      const whiteUrl = [
        '/api/user/login',
        '/api/place',
        '/api/auth',
        '/api/wxLogin',
        '/api/wx/addGrade',
        '/api/wx/addOrUpdateUser',
        '/api/wx/getGradeList',
        '/api/wx/openVip',
        '/api/wx/getStudentGrade',
        '/api/vip/pay',
        '/api/order/addOrder',
        '/api/addIntegral',
      ]
      const isInUrl = whiteUrl.some((item) => url.startsWith(item))
      if (isInUrl) {
        return false
      }
      // console.log(request)
      const whiteMethod = ['POST', 'PUT']
      // console.log('request.method', method)
      return whiteMethod.includes(method)
    },
  }

  exports.http = {
    headers: {
      common: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    },
    timeout: 10000,
  }

  // config.redis = {
  //   client: {
  //     port: 6379,
  //     host: '127.0.0.1',
  //     password: 'lsc511341',
  //     db: 0,
  //   },
  // }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  return {
    ...config,
    ...userConfig,
  }
}
