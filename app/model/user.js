'use strict'
const uuid = require('uuid').v4
const md5 = require('md5-node')
module.exports = (app) => {
  const { STRING, BOOLEAN, DATE, UUID } = app.Sequelize
  const User = app.model.define('user', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: () => {
        return uuid().replace(/-/g, '')
      },
    },
    born_city: {
      type: STRING(300),
      comment: '备注',
    },
    origin_id: {
      type: STRING(300),
      comment: '备注',
    },
    marriage: {
      type: STRING(300),
      comment: '备注',
    },
    sex: {
      type: STRING(300),
      comment: '备注',
    },
    body: {
      type: STRING(500),
      comment: '备注',
    },
    complaint_num: {
      type: STRING(300),
      comment: '备注',
    },
    external_get: {
      type: STRING(300),
      comment: '备注',
    },
    recommend: {
      type: STRING(300),
      comment: '备注',
    },
    weight: {
      type: STRING(300),
      comment: '备注',
    },
    monologue: {
      type: STRING(300),
      comment: '备注',
    },
    province: {
      type: STRING(300),
      comment: '备注',
    },
    all_getwx: {
      type: STRING(300),
      comment: '备注',
    },
    tousu: {
      type: STRING(300),
      comment: '备注',
    },
    area: {
      type: STRING(300),
      comment: '备注',
    },
    vip: {
      type: STRING(300),
      comment: '备注',
    },
    status: {
      type: STRING(300),
      comment: '备注',
    },
    avatar: {
      type: STRING(500),
      comment: '备注',
    },
    vip_end: {
      type: STRING(300),
      comment: '备注',
    },
    headimgurl: {
      type: STRING(500),
      comment: '备注',
    },
    born_data: {
      type: STRING(300),
      comment: '备注',
    },
    action_conuts: {
      type: STRING(300),
      comment: '备注',
    },
    born_area: {
      type: STRING(300),
      comment: '备注',
    },
    want_child: {
      type: STRING(300),
      comment: '备注',
    },
    update_time: {
      type: STRING(300),
      comment: '备注',
    },
    rec_time: {
      type: STRING(300),
      comment: '备注',
    },
    create_time: {
      type: STRING(300),
      comment: '备注',
    },
    couple_marriage: {
      type: STRING(300),
      comment: '备注',
    },
    deleted: {
      type: STRING(300),
      comment: '备注',
    },
    house: {
      type: STRING(300),
      comment: '备注',
    },
    country: {
      type: STRING(300),
      comment: '备注',
    },
    work_data: {
      type: STRING(300),
      comment: '备注',
    },
    education: {
      type: STRING(300),
      comment: '备注',
    },
    height: {
      type: STRING(300),
      comment: '备注',
    },
    car: {
      type: STRING(300),
      comment: '备注',
    },
    today_getwx: {
      type: STRING(300),
      comment: '备注',
    },
    show_counts: {
      type: STRING(300),
      comment: '备注',
    },
    age: {
      type: STRING(300),
      comment: '备注',
    },
    uname: {
      type: STRING(300),
      comment: '备注',
    },
    birthday: {
      type: STRING(300),
      comment: '备注',
    },
    realname: {
      type: STRING(300),
      comment: '备注',
    },
    profession: {
      type: STRING(300),
      comment: '备注',
    },
    marry_date: {
      type: STRING(300),
      comment: '备注',
    },
    bodily: {
      type: STRING(500),
      comment: '备注',
    },
    smoke: {
      type: STRING(300),
      comment: '备注',
    },
    mincouple_age: {
      type: STRING(300),
      comment: '备注',
    },
    maxcouple_age: {
      type: STRING(300),
      comment: '备注',
    },
    nickname: {
      type: STRING(300),
      comment: '备注',
    },
    nation: {
      type: STRING(300),
      comment: '备注',
    },
    unionid: {
      type: STRING(300),
      comment: '备注',
    },
    city: {
      type: STRING(300),
      comment: '备注',
    },
    subscribe: {
      type: STRING(300),
      comment: '备注',
    },
    upper: {
      type: STRING(500),
      comment: '备注',
    },
    language: {
      type: STRING(300),
      comment: '备注',
    },
    have_child: {
      type: STRING(300),
      comment: '备注',
    },
    mobile: {
      type: STRING(300),
      comment: '备注',
    },
    vip_start: {
      type: STRING(300),
      comment: '备注',
    },
    constellation: {
      type: STRING(300),
      comment: '备注',
    },
    drink: {
      type: STRING(300),
      comment: '备注',
    },
    income: {
      type: STRING(300),
      comment: '备注',
    },
    born_province: {
      type: STRING(300),
      comment: '备注',
    },
    wx_phone: {
      type: STRING(100),
      comment: '备注',
    },
  })

  return User
}
