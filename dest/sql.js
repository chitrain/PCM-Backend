'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequelize = new _sequelize2.default('pcm', 'root', 'mysqlpwd'); /**
                                                                     * @author Yujie Li
                                                                     * @email im_yujie@foxmail.com
                                                                     */

var User = exports.User = sequelize.define('user', {
  email: {
    type: _sequelize2.default.STRING
  },
  name: {
    type: _sequelize2.default.STRING
  },
  password: {
    type: _sequelize2.default.STRING
  }
}, {
  freezeTableName: true
});