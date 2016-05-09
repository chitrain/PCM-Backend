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

var Admin = _sql.sequelize.define('admin', {
  email: {
    type: _sequelize2.default.STRING
  },
  name: {
    type: _sequelize2.default.STRING
  },
  password: {
    type: _sequelize2.default.STRING
  }
});

/**
 * wrapper of admin class
 */

var _class = function () {
  function _class() {
    (0, _classCallCheck3.default)(this, _class);
  }

  /**
   * create a new admin and insert into db
   * @param email, name, password {String} 
   * @return {Promise}
   */


  (0, _createClass3.default)(_class, null, [{
    key: 'create',
    value: function create(email, name, password) {
      return Admin.create({ email: email, name: name, password: password });
    }

    /**
     * get a admin from db
     * @param email {String}
     * @return {Promise}
     */

  }, {
    key: 'get',
    value: function get(email) {
      var query = {
        where: { email: email }
      };
      return Admin.findOne(query);
    }
  }]);
  return _class;
}();

_class.model = Admin;
exports.default = _class;