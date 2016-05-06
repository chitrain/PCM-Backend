'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = exports.encrypt = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _bcryptNodejs = require('bcrypt-nodejs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// wrap origin callback-style function in a Promise

/**
 * @param raw {String} raw string
 * @return encrypted string
 */
var encrypt = exports.encrypt = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(raw) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
              (0, _bcryptNodejs.hash)(raw, null, null, function (err, hash) {
                if (err) return reject(err);
                resolve(hash);
              });
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return function encrypt(_x) {
    return ref.apply(this, arguments);
  };
}();

/**
 * @param raw {String} raw string
 * @param pwdHash {String} an encrypted string
 * @return true | false
 */
/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

var validate = exports.validate = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(raw, pwdHash) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new _promise2.default(function (resolve, reject) {
              (0, _bcryptNodejs.compare)(raw, pwdHash, function (err, res) {
                if (err) return reject(err);
                resolve(res);
              });
            }));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return function validate(_x2, _x3) {
    return ref.apply(this, arguments);
  };
}();