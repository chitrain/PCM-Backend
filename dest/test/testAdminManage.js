'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminManageTest = undefined;

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

var AdminManageTest = exports.AdminManageTest = function AdminManageTest() {

  // user does not exist
  it('admin login should fail', function (done) {
    server.post('/admin/login').type('form').send({
      email: 'im@foxmail.com',
      password: '123456'
    }).expect(200, {
      error: 1,
      msg: '用户不存在'
    }, done);
  });

  // wrong password
  it('admin login should fail', function (done) {
    server.post('/admin/login').type('form').send({
      email: 'im_yujie@foxmail.com',
      password: '12345'
    }).expect(200, {
      error: 1,
      msg: '密码错误'
    }, done);
  });

  // wrong - not permitted
  it('admin logout should fail', function (done) {
    server.get('/admin/logout').expect(200, {
      error: 1,
      msg: '没有权限'
    }, done);
  });

  // pass
  it('admin login should success', function (done) {
    server.post('/admin/login').type('form').send({
      email: 'im_yujie@foxmail.com',
      password: '123456'
    }).expect(200, {
      error: 0,
      msg: '登录成功'
    }, done);
  });

  // pass
  it('admin logout should success', function (done) {
    server.get('/admin/logout').expect(200, {
      error: 0,
      msg: '退出成功'
    }, done);
  });
};