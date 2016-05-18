'use strict';

var _testUserManage = require('./testUserManage');

var _testApplyRoom = require('./testApplyRoom');

var _testAdminManage = require('./testAdminManage');

var _testApproveRecord = require('./testApproveRecord');

/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

describe('user manage', _testUserManage.UserManageTest);
describe('apply room', _testApplyRoom.ApplyRoomTest);
describe('admin manage', _testAdminManage.AdminManageTest);
describe('approve record', _testApproveRecord.ApproveRecordTest);