// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCommon = require('../../../app/controller/common');
import ExportUpload = require('../../../app/controller/upload');
import ExportUser = require('../../../app/controller/user');
import ExportWxUser = require('../../../app/controller/wxUser');

declare module 'egg' {
  interface IController {
    common: ExportCommon;
    upload: ExportUpload;
    user: ExportUser;
    wxUser: ExportWxUser;
  }
}
