// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCommon = require('../../../app/controller/common');
import ExportUploadImg = require('../../../app/controller/uploadImg');
import ExportUser = require('../../../app/controller/user');
import ExportWxUser = require('../../../app/controller/wxUser');

declare module 'egg' {
  interface IController {
    common: ExportCommon;
    uploadImg: ExportUploadImg;
    user: ExportUser;
    wxUser: ExportWxUser;
  }
}
