// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportUser = require('../../../app/model/user');
import ExportWxUser = require('../../../app/model/wxUser');

declare module 'egg' {
  interface IModel {
    User: ReturnType<typeof ExportUser>;
    WxUser: ReturnType<typeof ExportWxUser>;
  }
}
