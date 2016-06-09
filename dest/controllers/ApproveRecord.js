'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadHandler = exports.getAllRecordHandler = exports.approveHandler = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _record = require('../models/record');

var _record2 = _interopRequireDefault(_record);

var _basic = require('../utils/basic');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * handler of approve a record
 * method: POST
 */
/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

var approveHandler = exports.approveHandler = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
    var recordID, status, record, applier, email;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            recordID = req.params.recordID;
            status = req.body.status;


            status = +status; // string to number

            if (!(status !== 0 && status !== 1 && status !== 2)) {
              _context.next = 6;
              break;
            }

            res.json({ error: 1, msg: '参数错误' });
            return _context.abrupt('return');

          case 6:
            _context.next = 8;
            return _record2.default.get(recordID);

          case 8:
            record = _context.sent;

            if (record) {
              _context.next = 12;
              break;
            }

            res.json({ error: 1, msg: '没有该条记录' });
            return _context.abrupt('return');

          case 12:
            // console.log(record)
            record.status = status;

            _context.prev = 13;
            _context.next = 16;
            return record.getApplier();

          case 16:
            applier = _context.sent;
            email = applier.email;

            console.log(email);
            _context.next = 25;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context['catch'](13);

            console.log(_context.t0);
            return _context.abrupt('return');

          case 25:
            _context.next = 27;
            return record.save();

          case 27:
            console.log('审批' + (0, _basic.extractStatus)(status));
            // notify users `email`
            res.json({ error: 0, msg: '审批完成' });

          case 29:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[13, 21]]);
  }));
  return function approveHandler(_x, _x2) {
    return ref.apply(this, arguments);
  };
}();

var getAllRecordHandler = exports.getAllRecordHandler = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res) {
    var result, reco, rec, r, applier, room;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log('ADMIN GET ALL RECORDS');
            _context2.next = 3;
            return _record2.default.getAllRecords();

          case 3:
            result = _context2.sent;
            reco = [];
            _context2.prev = 5;
            _context2.t0 = _regenerator2.default.keys(result);

          case 7:
            if ((_context2.t1 = _context2.t0()).done) {
              _context2.next = 19;
              break;
            }

            rec = _context2.t1.value;
            r = result[rec];
            _context2.next = 12;
            return r.getApplier();

          case 12:
            applier = _context2.sent;
            _context2.next = 15;
            return r.getRoom();

          case 15:
            room = _context2.sent;

            reco.push({
              date: r.date,
              id: r.id,
              unit: r.unit,
              startTime: r.startTime,
              endTime: r.endTime,
              scale: r.scale,
              applier: applier,
              status: r.status,
              room: room,
              attachment: r.attachment
            });
            _context2.next = 7;
            break;

          case 19:
            _context2.next = 25;
            break;

          case 21:
            _context2.prev = 21;
            _context2.t2 = _context2['catch'](5);

            console.log(_context2.t2);
            return _context2.abrupt('return');

          case 25:

            res.json({ error: 0, msg: reco });

          case 26:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[5, 21]]);
  }));
  return function getAllRecordHandler(_x3, _x4) {
    return ref.apply(this, arguments);
  };
}();
/**
 * handler of download attachment
 * method: GET
 */
var downloadHandler = exports.downloadHandler = function downloadHandler(req, res) {
  var path = req.query.path;

  res.download(path, 'application.pdf', function (err) {
    if (err) {
      console.log(err);
      res.json({ error: 1, msg: '意外错误' });
      return;
    }
    res.json({ error: 0, msg: '下载成功' });
    console.log('##LOG##: Finish download');
  });
};