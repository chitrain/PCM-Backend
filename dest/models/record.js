'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

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
  roomNo: {
    type: _sequelize2.default.STRING,
    references: {
      model: _room2.default.model,
      key: 'roomNo'
    }
  },
  applier: {
    type: _sequelize2.default.STRING,
    references: {
      model: _user2.default.model,
      key: 'email'
    }
  },
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
  }
}); /**
     * @author Yujie Li
     * @email im_yujie@foxmail.com
     */

var _class = function () {
  function _class() {
    (0, _classCallCheck3.default)(this, _class);
  }

  (0, _createClass3.default)(_class, null, [{
    key: 'create',
    value: function create(roomNo, applier, startTime, endTime, unit, scale, attachment) {
      Record.create({ roomNo: roomNo, applier: applier, startTime: startTime, endTime: endTime, unit: unit, scale: scale, attachment: attachment, status: 0 });
    }
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
    value: function getByRoomNo(roomNo) {
      var query = {
        where: {
          roomNo: roomNo
        }
      };

      return Record.findAll(query);
    }
  }]);
  return _class;
}();

_class.model = Record;
exports.default = _class;