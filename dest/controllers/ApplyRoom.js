'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRecordHandler = exports.applyHandler = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _record = require('../models/record');

var _record2 = _interopRequireDefault(_record);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applyHandler = exports.applyHandler = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
    var _req$body, startTime, endTime, roomNo, unit, scale, email;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body;
            startTime = _req$body.startTime;
            endTime = _req$body.endTime;
            roomNo = _req$body.roomNo;
            unit = _req$body.unit;
            scale = _req$body.scale;
            // save file

            email = req.signedCookies.email;
            _context.next = 9;
            return _record2.default.create(roomNo, applier, startTime, endTime, unit, scale, attachment);

          case 9:
            res.json({ error: 0, msg: '申请成功' });

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return function applyHandler(_x, _x2) {
    return ref.apply(this, arguments);
  };
}(); /**
      * @author Yujie Li
      * @email im_yujie@foxmail.com
      */

var getRecordHandler = exports.getRecordHandler = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res) {
    var _req$body2, roomNo, startTime, endTime, email, result;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body;
            roomNo = _req$body2.roomNo;
            startTime = _req$body2.startTime;
            endTime = _req$body2.endTime;
            email = req.signedCookies.emal;

            if (!roomNo) {
              _context2.next = 11;
              break;
            }

            _context2.next = 8;
            return _record2.default.getByRoomNo(roomNo);

          case 8:
            result = _context2.sent;

            res.json({ error: 0, message: result });
            return _context2.abrupt('return');

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return function getRecordHandler(_x3, _x4) {
    return ref.apply(this, arguments);
  };
}();