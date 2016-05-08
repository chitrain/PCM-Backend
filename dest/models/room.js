'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sql = require('./sql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

var Room = _sql.sequelize.define('room', {
  roomNo: {
    type: _sequelize2.default.STRING
  },
  opacity: {
    type: _sequelize2.default.INTEGER
  }
});(0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Room.sync({ force: true });

        case 2:
          Room.create({ roomNo: 'A101', opacity: 50 });
          Room.create({ roomNo: 'A102', opacity: 60 });
          Room.create({ roomNo: 'A103', opacity: 40 });
          Room.create({ roomNo: 'A104', opacity: 50 });
          Room.create({ roomNo: 'A105', opacity: 60 });
          Room.create({ roomNo: 'A106', opacity: 90 });

        case 8:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}))();

var _class = function () {
  function _class() {
    (0, _classCallCheck3.default)(this, _class);
  }

  /**
   * get a room by roomNo
   * @param roomNo {String}
   * @return {Promise}
   */


  (0, _createClass3.default)(_class, null, [{
    key: 'get',
    value: function get(roomNo) {
      var query = {
        where: { roomNo: roomNo }
      };

      return Room.findOne(query);
    }

    /**
     * get a room by roomNo
     * @param roomNo {String}
     * @param opacity {Number}
     * @return {Promise}
     */

  }, {
    key: 'create',
    value: function create(roomNo, opacity) {
      console.log(roomNo, opacity);
      return Room.create({ roomNo: roomNo, opacity: opacity });
    }
  }, {
    key: 'create',
    value: function create(email, name, password) {
      return Admin.create({ email: email, name: name, password: password });
    }
  }]);
  return _class;
}();

_class.model = Room;
exports.default = _class;