// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportOrder = require('../../../app/model/order');
import ExportUser = require('../../../app/model/user');
import ExportUserWxUser = require('../../../app/model/userWxUser');
import ExportWxUser = require('../../../app/model/wxUser');

declare module 'egg' {
  interface IModel {
    Order: ReturnType<typeof ExportOrder>;
    User: ReturnType<typeof ExportUser>;
    UserWxUser: ReturnType<typeof ExportUserWxUser>;
    WxUser: ReturnType<typeof ExportWxUser>;
  }
}
