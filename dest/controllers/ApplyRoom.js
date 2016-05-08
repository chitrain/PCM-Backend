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

var _room = require('../models/room');

var _room2 = _interopRequireDefault(_room);

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
          return _room2.default.create('A101', 50);

        case 2:
          _context.next = 4;
          return _room2.default.create('A102', 50);

        case 4:
          _context.next = 6;
          return _room2.default.create('A103', 40);

        case 6:
          _context.next = 8;
          return _room2.default.create('A104', 50);

        case 8:
          _context.next = 10;
          return _room2.default.create('A105', 60);

        case 10:
          _context.next = 12;
          return _room2.default.create('A106', 50);

        case 12:
          _context.next = 14;
          return _room2.default.create('A107', 90);

        case 14:
          console.log('created room!!!');

        case 15:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}))();

var applyHandler = exports.applyHandler = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res) {
    var _req$body, startTime, endTime, roomNo, unit, scale, applier;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body;
            startTime = _req$body.startTime;
            endTime = _req$body.endTime;
            roomNo = _req$body.roomNo;
            unit = _req$body.unit;
            scale = _req$body.scale;
            // save file

            applier = req.signedCookies.email;

            console.log(req);
            _context2.next = 10;
            return _record2.default.create(roomNo, applier, startTime, endTime, unit, scale, attachment);

          case 10:
            res.json({ error: 0, msg: '申请成功' });

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return function applyHandler(_x, _x2) {
    return ref.apply(this, arguments);
  };
}();

var getRecordHandler = exports.getRecordHandler = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res) {
    var _req$query, roomNo, startTime, endTime, email, result;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$query = req.query;
            roomNo = _req$query.roomNo;
            startTime = _req$query.startTime;
            endTime = _req$query.endTime;
            email = req.signedCookies.emal;

            if (!roomNo) {
              _context3.next = 11;
              break;
            }

            _context3.next = 8;
            return _record2.default.getByRoomNo(roomNo);

          case 8:
            result = _context3.sent;

            res.json({ error: 0, message: result });
            return _context3.abrupt('return');

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return function getRecordHandler(_x3, _x4) {
    return ref.apply(this, arguments);
  };
}();