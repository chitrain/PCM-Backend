'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApplyRoomTest = undefined;

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

var ApplyRoomTest = exports.ApplyRoomTest = function ApplyRoomTest() {
  it('login should success', function (done) {
    server.post('/login').type('form').send({
      email: 'im_yujie@foxmail.com',
      password: '654321'
    }).expect('set-cookie', /im_yujie/g).expect(200, {
      error: 0,
      msg: '登录成功'
    }, done);
  });

  it('apply room should success', function (done) {
    server.post('/record').field('startTime', '2016-05-08 12:00').field('endTime', '2016-05-08 15:00').field('roomNo', 'A101').field('unit', '呵呵哒').field('scale', '40').attach('file', '../testData/neipei.docx').expect(200, {
      error: 0,
      msg: '申请成功'
    }, done);
  });

  it('get record should success', function (done) {
    server.get('/record').query({ roomNo: 'A101' }).expect(200, {
      error: 0,
      message: '成功'
    }, done);
  });
};