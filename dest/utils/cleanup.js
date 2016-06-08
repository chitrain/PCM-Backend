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
 * @param min {number}
 * @param max {number}
 */
/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

var genAmount = function genAmount(min, max) {
  var range = max - min;
  var rand = Math.random();
  var num = min + Math.round(rand * range);
  return num;
};

var genRooms = function genRooms() {
  var res = [];
  var buildings = ['A', 'B', 'C', 'D', 'E'];
  var floors = [1, 2, 3, 4, 5, 6];
  var rooms = ['01', '02', '03', '04', '05', '06', '07'];

  for (var b in buildings) {
    for (var f in floors) {
      for (var r in rooms) {
        res.push({ roomNo: buildings[b] + floors[f] + rooms[r], capacity: genAmount(40, 100) });
      }
    }
  }return res;
};

/**
 * clean up database when developing.
 * create some mock data.
 */
var cleanup = exports.cleanup = function cleanup() {
  _record2.default.model.belongsTo(_user2.default.model, { as: 'applier', foreignKey: 'applierId' });
  _record2.default.model.belongsTo(_room2.default.model, { as: 'room', foreignKey: 'roomId' });

  _sql.sequelize.query('SET FOREIGN_KEY_CHECKS = 0').then(function () {
    return _sql.sequelize.sync({ force: true });
  }).then(function () {
    return _sql.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  }).then(function () {
    (0, _crypt.encrypt)('123456').then(function (hashPwd) {
      return _admin2.default.model.create({ email: 'im_yujie@foxmail.com', name: 'Yujie', password: hashPwd });
    });
    var rooms = genRooms();

    for (var room in rooms) {
      _room2.default.model.create(rooms[room]);
    }
    return _room2.default.model.create({ roomNo: 'E108', capacity: 90 });
  }).then(function () {
    console.log('finish init database...');
  });
};