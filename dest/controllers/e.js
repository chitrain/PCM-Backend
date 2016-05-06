'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logoutHandler = exports.loginHandler = exports.registerHandler = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _crypt = require('../utils/crypt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * handler of register
 * method: POST
 * body: email=xxx&name=xxx&password=xxx
 */
/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

var registerHandler = exports.registerHandler = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
    var _req$body, email, name, password, user, hashPwd, newUser;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body;
            email = _req$body.email;
            name = _req$body.name;
            password = _req$body.password;
            _context.next = 6;
            return _user2.default.get(email);

          case 6:
            user = _context.sent;

            if (!(user.length !== 0)) {
              _context.next = 10;
              break;
            }

            res.json({ error: 1, msg: '邮箱已被注册' });
            return _context.abrupt('return');

          case 10:
            _context.next = 12;
            return (0, _crypt.encrypt)(password);

          case 12:
            hashPwd = _context.sent;
            _context.next = 15;
            return _user2.default.create(email, name, hashPwd);

          case 15:
            newUser = _context.sent;

            console.log(newUser);
            res.json({ error: 0, msg: '注册成功' });

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return function registerHandler(_x, _x2) {
    return ref.apply(this, arguments);
  };
}();

/**
 * handler of login
 * method: POST
 * body: email=xxx&password=xxx
 */
var loginHandler = exports.loginHandler = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res) {
    var _req$body2, email, password, user, userPwd, isRight;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body;
            email = _req$body2.email;
            password = _req$body2.password;
            _context2.next = 5;
            return _user2.default.get(email);

          case 5:
            user = _context2.sent;
            userPwd = user[0].dataValues.password;
            _context2.next = 9;
            return (0, _crypt.validate)(password, userPwd);

          case 9:
            isRight = _context2.sent;

            if (isRight) {
              _context2.next = 13;
              break;
            }

            res.json({ error: 1, message: '密码错误' });
            return _context2.abrupt('return');

          case 13:

            res.cookie('email', email, { signed: true });
            res.json({ error: 0, message: '' });

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return function loginHandler(_x3, _x4) {
    return ref.apply(this, arguments);
  };
}();

/**
 * handler of login
 * method: GET
 */
var logoutHandler = exports.logoutHandler = function logoutHandler(req, res) {
  console.log(req.signedCookies.email);
  res.clearCookie('email');
  res.json({ msg: 'success' });
};