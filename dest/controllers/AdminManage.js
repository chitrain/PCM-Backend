'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminLoginHandler = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _admin = require('../models/admin');

var _admin2 = _interopRequireDefault(_admin);

var _crypt = require('../utils/crypt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

(0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _admin2.default.create('im_yujie@foxmail.com', 'Yujie', '123');

        case 2:
          console.log('created admin!!!');

        case 3:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}))();

/**
 * handler of login
 * method: POST
 * body: email=xxx&password=xxx
 */
var adminLoginHandler = exports.adminLoginHandler = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res) {
    var _req$body, email, password, admin, userPwd, isRight;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body;
            email = _req$body.email;
            password = _req$body.password;
            _context2.next = 5;
            return _admin2.default.get(email);

          case 5:
            admin = _context2.sent;
            userPwd = user[0].dateValues.password;
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
  return function adminLoginHandler(_x, _x2) {
    return ref.apply(this, arguments);
  };
}();