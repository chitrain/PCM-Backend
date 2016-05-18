'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanup = undefined;

var _sql = require('../models/sql');

var _record = require('../models/record');

var _record2 = _interopRequireDefault(_record);

var _admin = require('../models/admin');

var _admin2 = _interopRequireDefault(_admin);

var _room = require('../models/room');

var _room2 = _interopRequireDefault(_room);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _crypt = require('./crypt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * clean up database when developing.
 * create some mock data.
 */
/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

var cleanup = exports.cleanup = function cleanup() {
  _record2.default.model.belongsTo(_user2.default.model, { foreignKey: 'applierId' });
  _record2.default.model.belongsTo(_room2.default.model, { foreignKey: 'roomId' });

  _sql.sequelize.query('SET FOREIGN_KEY_CHECKS = 0').then(function () {
    return _sql.sequelize.sync({ force: true });
  }).then(function () {
    return _sql.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  }).then(function () {
    (0, _crypt.encrypt)('123456').then(function (hashPwd) {
      return _admin2.default.model.create({ email: 'im_yujie@foxmail.com', name: 'Yujie', password: hashPwd });
    });
    _room2.default.model.create({ roomNo: 'A101', capacity: 50 });
    _room2.default.model.create({ roomNo: 'A102', capacity: 60 });
    _room2.default.model.create({ roomNo: 'A103', capacity: 40 });
    _room2.default.model.create({ roomNo: 'A104', capacity: 50 });
    _room2.default.model.create({ roomNo: 'A105', capacity: 60 });
    return _room2.default.model.create({ roomNo: 'A106', capacity: 90 });
  }).then(function () {
    console.log('finish init database...');
  });
};