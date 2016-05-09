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

var User = _sql.sequelize.define('user', {
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
 * wrapper of user class
 */

var _class = function () {
  function _class() {
    (0, _classCallCheck3.default)(this, _class);
  }

  /**
   * get a user from database
   * @param email {String}
   * @return {Promise}
   */


  (0, _createClass3.default)(_class, null, [{
    key: 'get',
    value: function get(email) {
      var query = {
        where: { email: email }
      };
      // User.findAll actually return a Promise,
      // so we can use `await` syntax
      return User.findOne(query);
    }

    /**
     * create a new user and
     * insert into db
     * @param email, name, password {String}
     * @return {Promise}
     */

  }, {
    key: 'create',
    value: function create(email, name, password) {
      return User.create({ email: email, name: name, password: password });
    }
  }]);
  return _class;
}();

_class.model = User;
exports.default = _class;