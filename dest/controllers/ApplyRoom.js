'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRecordHandler = exports.applyHandler = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _record = require('../models/record');

var _record2 = _interopRequireDefault(_record);

var _room = require('../models/room');

var _room2 = _interopRequireDefault(_room);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * handler of apply room
 * method: POST
 */
/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

var applyHandler = exports.applyHandler = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
    var _req$body, date, startTime, endTime, roomNo, unit, scale, startDate, endDate, applier, attachment, room, records;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body;
            date = _req$body.date;
            startTime = _req$body.startTime;
            endTime = _req$body.endTime;
            roomNo = _req$body.roomNo;
            unit = _req$body.unit;
            scale = _req$body.scale;

            // check non empty

            if (!(!date || !startTime || !endTime || !unit || !scale)) {
              _context.next = 10;
              break;
            }

            res.json({ error: 1, msg: '参数错误：出现空参数' });
            return _context.abrupt('return');

          case 10:
            if (req.file) {
              _context.next = 13;
              break;
            }

            res.json({ error: 1, msg: '文件上传错误：未找到文件' });
            return _context.abrupt('return');

          case 13:
            startDate = (0, _moment2.default)(date + ' ' + startTime);
            endDate = (0, _moment2.default)(date + ' ' + endTime);

            // validate date

            if (!(!startDate.isValid() || !endDate.isValid() || startDate.isAfter(endDate))) {
              _context.next = 18;
              break;
            }

            res.json({ error: 1, msg: '参数错误：不合法时间' });
            return _context.abrupt('return');

          case 18:
            applier = req.session.user.email;
            attachment = req.file.path;


            console.log('date: ' + date + ' startTime: ' + startTime + ' | endTime: ' + endTime + ' | roomNo: ' + roomNo + ' | unit: ' + unit + ' | scale: ' + scale);

            _context.next = 23;
            return _room2.default.get(roomNo);

          case 23:
            room = _context.sent;

            if (room) {
              _context.next = 27;
              break;
            }

            res.json({ error: 1, msg: '没有该房间' });
            return _context.abrupt('return');

          case 27:
            if (!(room.capacity < +scale)) {
              _context.next = 30;
              break;
            }

            res.json({ error: 1, msg: '课室容量不满足' });
            return _context.abrupt('return');

          case 30:
            _context.next = 32;
            return _record2.default.getByRoomNo(roomNo);

          case 32:
            records = _context.sent;


            records = records.filter(function (record) {

              var rsDate = (0, _moment2.default)(record.startDate);
              var reDate = (0, _moment2.default)(record.endDate);

              return startDate.isBetween(rsDate, reDate) || endDate.isBetween(rsDate, reDate);
            });

            if (!(records.length > 0)) {
              _context.next = 37;
              break;
            }

            res.json({ error: 1, msg: '出现时间冲突', addition: records });
            return _context.abrupt('return');

          case 37:
            _context.next = 39;
            return _record2.default.create(roomNo, applier, date, startTime, endTime, unit, scale, attachment);

          case 39:
            res.json({ error: 0, msg: '申请成功' });

          case 40:
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
 * handler of get record
 * method: GET
 */
var getRecordHandler = exports.getRecordHandler = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res) {
    var _req$query, date, roomNo, startTime, endTime, email, result, _ret, room;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$query = req.query;
            date = _req$query.date;
            roomNo = _req$query.roomNo;
            startTime = _req$query.startTime;
            endTime = _req$query.endTime;
            email = req.session.user.email;


            console.log('## LOG ##', 'roomNo: ' + roomNo + ', startTime: ' + startTime + ', endTime: ' + endTime);
            console.log('## LOG ##', 'email: ' + email);

            _context4.next = 10;
            return _record2.default.getAllRecords();

          case 10:
            result = _context4.sent;

            if (!date) {
              _context4.next = 17;
              break;
            }

            result.filter(function (record) {
              return (0, _moment2.default)(date).isSame(record.date);
            });

            if (!(startTime || endTime)) {
              _context4.next = 17;
              break;
            }

            _ret = function () {
              var currentDate = (0, _moment2.default)();
              var startDate = currentDate;
              var endDate = currentDate.add(14, 'days'); // after two weeks as default endDate

              if (startTime) {
                // startTime can't before now
                startDate = (0, _moment2.default)(date + ' ' + startTime);
                if (startDate.isBefore(currentDate)) {
                  res.json({ error: 1, msg: '起点时间不能早于当前时间' });
                  return {
                    v: void 0
                  };
                }

                if (startDate.isAfter(currentDate.add(14, 'days'))) {
                  res.json({ error: 1, msg: '只能查询两周以内的课室' });
                  return {
                    v: void 0
                  };
                }
              }

              if (endTime) {
                // startTime can't before now
                endDate = (0, _moment2.default)(date + ' ' + endTime);
                if (endDate.isBefore(currentDate)) {
                  res.json({ error: 1, msg: '末尾时间不能早于当前时间' });
                  return {
                    v: void 0
                  };
                }

                if (endDate.isAfter(currentDate.add(14, 'days'))) {
                  res.json({ error: 1, msg: '只能查询两周以内的课室' });
                  return {
                    v: void 0
                  };
                }
              }

              if (startDate.isBefore(endDate)) {
                result = result.filter(function (record) {
                  var sDate = (0, _moment2.default)(record.startDate);
                  var eDate = (0, _moment2.default)(record.endDate);
                  return sDate.isBetween(startDate, endDate) || eDate.isBetween(startDate, endDate);
                });
              }
            }();

            if (!((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object")) {
              _context4.next = 17;
              break;
            }

            return _context4.abrupt('return', _ret.v);

          case 17:
            if (!roomNo) {
              _context4.next = 25;
              break;
            }

            _context4.next = 20;
            return _room2.default.get(roomNo);

          case 20:
            room = _context4.sent;

            if (room) {
              _context4.next = 24;
              break;
            }

            res.json({ error: 1, msg: '没有该房间' });
            return _context4.abrupt('return');

          case 24:

            result = result.filter(function () {
              var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(record) {
                var room;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return record.getRoom();

                      case 2:
                        room = _context2.sent;
                        return _context2.abrupt('return', record.getRoom().roomNo == roomNo);

                      case 4:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, this);
              }));
              return function (_x5) {
                return ref.apply(this, arguments);
              };
            }());

          case 25:

            // when no time or roomNo, return user's records
            if (!date && !startTime && !endTime && !roomNo) {
              result = result.filter(function () {
                var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(record) {
                  var applier;
                  return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return record.getApplier();

                        case 2:
                          applier = _context3.sent;
                          return _context3.abrupt('return', applier.email == email);

                        case 4:
                        case 'end':
                          return _context3.stop();
                      }
                    }
                  }, _callee3, this);
                }));
                return function (_x6) {
                  return ref.apply(this, arguments);
                };
              }());
            }

            res.json({ error: 0, msg: result });

          case 27:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));
  return function getRecordHandler(_x3, _x4) {
    return ref.apply(this, arguments);
  };
}();