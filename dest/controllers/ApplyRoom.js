'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRecordHandler = exports.applyHandler = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _record = require('../models/record');

var _record2 = _interopRequireDefault(_record);

var _room = require('../models/room');

var _room2 = _interopRequireDefault(_room);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * method: POST
 */
var applyHandler = exports.applyHandler = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
    var _req$body, startTime, endTime, roomNo, unit, scale, applier, attachment, room;

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
            applier = req.session.user.email;
            attachment = req.file.path;

            console.log('startTime: ' + startTime + ' | endTime: ' + endTime + ' | roomNo: ' + roomNo + ' | unit: ' + unit + ' | scale: ' + scale);

            _context.next = 11;
            return _room2.default.get(roomNo);

          case 11:
            room = _context.sent;

            if (room) {
              _context.next = 15;
              break;
            }

            res.json({ error: 1, msg: '没有房间' });
            return _context.abrupt('return');

          case 15:
            if (!(room.opacity < +scale)) {
              _context.next = 18;
              break;
            }

            res.json({ error: 1, msg: '课室容量不足' });
            return _context.abrupt('return');

          case 18:
            _context.next = 20;
            return _record2.default.create(roomNo, applier, startTime, endTime, unit, scale, attachment);

          case 20:
            res.json({ error: 0, msg: '申请成功' });

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return function applyHandler(_x, _x2) {
    return ref.apply(this, arguments);
  };
}();

/**
 * method: GET
 */
/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

var getRecordHandler = exports.getRecordHandler = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res) {
    var _req$query, roomNo, startTime, endTime, email, result, _result;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$query = req.query;
            roomNo = _req$query.roomNo;
            startTime = _req$query.startTime;
            endTime = _req$query.endTime;
            email = req.session.user.email;

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
            if (!startTime) {
              _context2.next = 15;
              break;
            }

            _context2.next = 14;
            return _record2.default.getByStartTime();

          case 14:
            _result = _context2.sent;

          case 15:
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