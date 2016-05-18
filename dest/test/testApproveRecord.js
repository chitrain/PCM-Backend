'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApproveRecordTest = undefined;

var _supertest = require('supertest');

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = (0, _supertest.agent)(_config2.default.url); /**
                                                           * @author Yujie Li
                                                           * @email im_yujie@foxmail.com
                                                           */

var ApproveRecordTest = exports.ApproveRecordTest = function ApproveRecordTest() {
  it('admin login should success', function (done) {
    server.post('/admin/login').type('form').send({
      email: 'im_yujie@foxmail.com',
      password: '123456'
    }).expect(200, {
      error: 0,
      msg: '登录成功'
    }, done);
  });

  // it('approve a record should fail', (done) => {
  //   server
  //     .post('/record/')
  // })
};