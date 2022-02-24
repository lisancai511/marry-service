// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCommon = require('../../../app/service/common');
import ExportUpload = require('../../../app/service/upload');
import ExportUser = require('../../../app/service/user');
import ExportWxUser = require('../../../app/service/wxUser');

declare module 'egg' {
  interface IService {
    common: ExportCommon;
    upload: ExportUpload;
    user: ExportUser;
    wxUser: ExportWxUser;
  }
}
