'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanup = undefined;

var _sql = require('./models/sql');

var _record = require('./models/record');

var _record2 = _interopRequireDefault(_record);

var _admin = require('./models/admin');

var _admin2 = _interopRequireDefault(_admin);

var _room = require('./models/room');

var _room2 = _interopRequireDefault(_room);

var _user = require('./models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cleanup = exports.cleanup = function cleanup() {
  _record2.default.model.belongsTo(_user2.default.model, { foreignKey: 'applierId' });
  _record2.default.model.belongsTo(_room2.default.model, { foreignKey: 'roomId' });

  _sql.sequelize.query('SET FOREIGN_KEY_CHECKS = 0').then(function () {
    return _sql.sequelize.sync({ force: true });
  }).then(function () {
    return _sql.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  }).then(function () {
    _admin2.default.model.create({ email: 'im_yujie@foxmail.com', name: 'Yujie', password: '123' });
    _room2.default.model.create({ roomNo: 'A101', opacity: 50 });
    _room2.default.model.create({ roomNo: 'A102', opacity: 60 });
    _room2.default.model.create({ roomNo: 'A103', opacity: 40 });
    _room2.default.model.create({ roomNo: 'A104', opacity: 50 });
    _room2.default.model.create({ roomNo: 'A105', opacity: 60 });
    return _room2.default.model.create({ roomNo: 'A106', opacity: 90 });
  }).then(function () {
    console.log('finish');
  });
};