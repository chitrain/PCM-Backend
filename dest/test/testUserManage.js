'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserManageTest = undefined;

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

var UserManageTest = exports.UserManageTest = function UserManageTest() {
  it('register should success', function (done) {
    server.post('/register').type('form').send({
      email: 'im_yujie@foxmail.com',
      name: 'liyujie',
      password: '123456'
    }).expect(200, {
      error: 0,
      msg: '注册成功'
    }, done);
  });

  it('login should fail', function (done) {
    server.post('/login').type('form').send({
      email: 'im_yujie@foxmail.com',
      password: '123457' // wrong
    }).expect(200, {
      error: 1,
      msg: '密码错误'
    }, done);
  });

  it('login should success', function (done) {
    server.post('/login').type('form').send({
      email: 'im_yujie@foxmail.com',
      password: '123456'
    }).expect('set-cookie', /im_yujie/g).expect(200, {
      error: 0,
      msg: '登录成功'
    }, done);
  });

  it('change passoword should fail', function (done) {
    server.post('/password').type('form').send({
      oldPassword: '123476', // wrong
      newPassword: '654321'
    }).expect(200, {
      error: 1,
      msg: '密码错误'
    }, done);
  });

  it('change passoword should success', function (done) {
    server.post('/password').type('form').send({
      oldPassword: '123456',
      newPassword: '654321'
    }).expect(200, {
      error: 0,
      msg: '修改成功'
    }, done);
  });

  it('logout should success', function (done) {
    server.get('/logout').expect('set-cookie', /email=;/g).expect(200, { msg: '退出成功' }, done);
  });
};