'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sql = require('./sql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

var Room = _sql.sequelize.define('user', {
  roomNo: {
    type: _sequelize2.default.STRING
  },
  opacity: {
    type: _sequelize2.default.INTEGER
  }
}, {
  freezeTableName: true
});

var _class = function () {
  function _class() {
    (0, _classCallCheck3.default)(this, _class);
  }

  (0, _createClass3.default)(_class, null, [{
    key: 'get',
    value: function get(roomNo) {
      var query = {
        where: { roomNo: roomNo }
      };

      return Room.findAll(query);
    }
  }, {
    key: 'create',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(roomNo, opacity) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Room.sync({ force: true });

              case 2:
                return _context.abrupt('return', Room.create({ roomNo: roomNo, opacity: opacity }));

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function create(_x, _x2) {
        return ref.apply(this, arguments);
      }

      return create;
    }()
  }]);
  return _class;
}();

_class.model = Room;
exports.default = _class;