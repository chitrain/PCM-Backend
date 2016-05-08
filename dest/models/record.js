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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _room = require('./room');

var _room2 = _interopRequireDefault(_room);

var _sql = require('./sql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * status: 0-pending | 1-passed | 2-rejected
 */
var Record = _sql.sequelize.define('record', {
  startTime: {
    type: _sequelize2.default.DATE
  },
  endTime: {
    type: _sequelize2.default.DATE
  },
  unit: {
    type: _sequelize2.default.STRING
  },
  scale: {
    type: _sequelize2.default.INTEGER
  },
  attachment: {
    type: _sequelize2.default.STRING
  },
  status: {
    type: _sequelize2.default.INTEGER
  },
  applierId: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: _user2.default.model,
      key: 'id'
    }
  },
  roomId: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: _room2.default.model,
      key: 'id'
    }
  }
}); /**
     * @author Yujie Li
     * @email im_yujie@foxmail.com
     */

(0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          Record.belongsTo(_user2.default.model, { foreignKey: 'applierId' });
          Record.belongsTo(_room2.default.model, { foreignKey: 'roomId' });
          Record.sync({ force: true });

        case 3:
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

  (0, _createClass3.default)(_class, null, [{
    key: 'create',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(roomNo, applier, startTime, endTime, unit, scale, attachment) {
        var user, room, record;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _user2.default.get(applier);

              case 2:
                user = _context2.sent;
                _context2.next = 5;
                return _room2.default.get(roomNo);

              case 5:
                room = _context2.sent;
                _context2.next = 8;
                return Record.create({
                  startTime: startTime,
                  endTime: endTime,
                  unit: unit,
                  scale: scale,
                  attachment: attachment,
                  status: 0
                });

              case 8:
                record = _context2.sent;
                _context2.prev = 9;
                _context2.next = 12;
                return record.setUser(user);

              case 12:
                _context2.next = 17;
                break;

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2['catch'](9);

                console.error(_context2.t0);

              case 17:
                _context2.next = 19;
                return record.save();

              case 19:
                _context2.next = 21;
                return record.setRoom(room);

              case 21:
                _context2.next = 23;
                return record.save();

              case 23:
                console.log('set finish..........');
                return _context2.abrupt('return', record.save());

              case 25:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[9, 14]]);
      }));

      function create(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
        return ref.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: 'getByApplier',
    value: function getByApplier(applier) {
      var query = {
        where: {
          applier: applier
        }
      };

      return Record.findAll(query);
    }
  }, {
    key: 'getByStartTime',
    value: function getByStartTime(startTime) {
      var query = {
        where: {
          startTime: startTime
        }
      };

      return Record.findAll(query);
    }
  }, {
    key: 'getByEndTime',
    value: function getByEndTime(endTime) {
      var query = {
        where: {
          endTime: endTime
        }
      };

      return Record.findAll(query);
    }
  }, {
    key: 'getByRoomNo',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(roomNo) {
        var room, query;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _room2.default.get(roomNo);

              case 2:
                room = _context3.sent;
                query = {
                  where: {
                    roomId: room.id
                  }
                };
                return _context3.abrupt('return', Record.findAll(query));

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getByRoomNo(_x8) {
        return ref.apply(this, arguments);
      }

      return getByRoomNo;
    }()
  }, {
    key: 'get',
    value: function get(recordID) {
      var query = {
        where: { id: recordID }
      };

      return Record.findOne(query);
    }
  }]);
  return _class;
}();

_class.model = Record;
exports.default = _class;