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
  capacity: {
    type: _sequelize2.default.INTEGER
  }
});

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
     * @param capacity {Number}
     * @return {Promise}
     */

  }, {
    key: 'create',
    value: function create(roomNo, capacity) {
      console.log(roomNo, capacity);
      return Room.create({ roomNo: roomNo, capacity: capacity });
    }
  }]);
  return _class;
}();

_class.model = Room;
exports.default = _class;