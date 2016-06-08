'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changePasswordHandler = exports.logoutHandler = exports.loginHandler = exports.registerHandler = undefined;

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


            console.log('email: ' + email + ' | name: ' + name + ' | password: ' + password);
            _context.next = 7;
            return _user2.default.get(email);

          case 7:
            user = _context.sent;

            console.log(user);

            if (!user) {
              _context.next = 12;
              break;
            }

            res.json({ error: 1, msg: '邮箱已被注册' });
            return _context.abrupt('return');

          case 12:
            _context.next = 14;
            return (0, _crypt.encrypt)(password);

          case 14:
            hashPwd = _context.sent;
            _context.next = 17;
            return _user2.default.create(email, name, hashPwd);

          case 17:
            newUser = _context.sent;

            // console.log(newUser)
            req.session.user = { email: email, name: name };
            console.log('已登录');
            console.log(req.session);
            res.json({ error: 0, msg: '注册成功' });

          case 22:
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


            console.log('email: ' + email + ' | password: ' + password);
            _context2.next = 6;
            return _user2.default.get(email);

          case 6:
            user = _context2.sent;

            if (user) {
              _context2.next = 10;
              break;
            }

            res.json({ error: 1, msg: '用户不存在' });
            return _context2.abrupt('return');

          case 10:
            userPwd = user.password;
            _context2.next = 13;
            return (0, _crypt.validate)(password, userPwd);

          case 13:
            isRight = _context2.sent;

            if (isRight) {
              _context2.next = 17;
              break;
            }

            res.json({ error: 1, msg: '密码错误' });
            return _context2.abrupt('return');

          case 17:

            req.session.user = { email: email, name: user.name };
            // res.cookie('email', email, {signed: true})
            console.log('已登录');
            console.log(req.session);
            res.json({ error: 0, msg: '登录成功' });

          case 21:
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
  console.log('登出');
  req.session.user = null;
  res.json({ error: 0, msg: '退出成功' });
};

/**
 * handler of changing password
 * method: POST
 */
var changePasswordHandler = exports.changePasswordHandler = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res) {
    var _req$body3, oldPassword, newPassword, email, user, isRight;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body3 = req.body;
            oldPassword = _req$body3.oldPassword;
            newPassword = _req$body3.newPassword;
            email = req.session.user.email;


            console.log('oldPwd: ' + oldPassword + ' | newPwd: ' + newPassword);
            console.log('changed: ', email);

            _context3.next = 8;
            return _user2.default.get(email);

          case 8:
            user = _context3.sent;
            _context3.next = 11;
            return (0, _crypt.validate)(oldPassword, user.password);

          case 11:
            isRight = _context3.sent;

            console.log('changed: ', isRight);

            if (isRight) {
              _context3.next = 16;
              break;
            }

            res.json({ error: 1, msg: '密码错误' });
            return _context3.abrupt('return');

          case 16:
            _context3.next = 18;
            return (0, _crypt.encrypt)(newPassword);

          case 18:
            user.password = _context3.sent;
            _context3.next = 21;
            return user.save();

          case 21:
            console.log('changed: ', 'finish');

            req.session.user = null;
            res.json({ error: 0, msg: '修改成功' });

          case 24:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return function changePasswordHandler(_x5, _x6) {
    return ref.apply(this, arguments);
  };
}();