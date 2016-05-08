'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.approveHandler = undefined;

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
    var _req$body, recordID, status, record;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body;
            recordID = _req$body.recordID;
            status = _req$body.status;
            _context.next = 5;
            return _record2.default.get(recordID);

          case 5:
            record = _context.sent;

            record.status = +status;

            _context.next = 9;
            return record.save();

          case 9:
            console.log('审批' + (0, _basic.extractStatus)(status));
            // notify users
            res.json({ error: 0, msg: '审批完成' });

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return function approveHandler(_x, _x2) {
    return ref.apply(this, arguments);
  };
}();