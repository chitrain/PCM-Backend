'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminLogoutHandler = exports.adminLoginHandler = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _admin = require('../models/admin');

var _admin2 = _interopRequireDefault(_admin);

var _crypt = require('../utils/crypt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * handler of login
 * method: POST
 * body: email=xxx&password=xxx
 */
/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

var adminLoginHandler = exports.adminLoginHandler = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
    var _req$body, email, password, admin, userPwd, isRight;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body;
            email = _req$body.email;
            password = _req$body.password;
            _context.next = 5;
            return _admin2.default.get(email);

          case 5:
            admin = _context.sent;

            if (admin) {
              _context.next = 9;
              break;
            }

            res.json({ error: 1, msg: '用户不存在' });
            return _context.abrupt('return');

          case 9:
            userPwd = admin.password;
            _context.next = 12;
            return (0, _crypt.validate)(password, userPwd);

          case 12:
            isRight = _context.sent;

            if (isRight) {
              _context.next = 16;
              break;
            }

            res.json({ error: 1, msg: '密码错误' });
            return _context.abrupt('return');

          case 16:

            req.session.admin = { email: email, name: admin.name };
            res.json({ error: 0, msg: '登录成功' });

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return function adminLoginHandler(_x, _x2) {
    return ref.apply(this, arguments);
  };
}();

/**
 * handler of logout
 * method: GET
 */
var adminLogoutHandler = exports.adminLogoutHandler = function adminLogoutHandler(req, res) {
  try {
    console.log('## LOG ##', 'GET /admin/logout');
    req.session.admin = null;
    res.json({ error: 0, msg: '退出成功' });
  } catch (e) {
    res.json({ error: 1, msg: '意外错误' });
  }
};