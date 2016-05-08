'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = exports.upload = undefined;

var _express = require('express');

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _UserManage = require('./controllers/UserManage');

var _ApplyRoom = require('./controllers/ApplyRoom');

var _ApproveRecord = require('./controllers/ApproveRecord');

var _AdminManage = require('./controllers/AdminManage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

var upload = exports.upload = (0, _multer2.default)({ dest: '../tempStore' });
var router = exports.router = (0, _express.Router)();

router.get('/', function (req, res) {
  return res.json({ msg: 'index' });
});

/**
 * route to User Manage
 */
router.post('/register', _UserManage.registerHandler);
router.post('/login', _UserManage.loginHandler);
router.get('/logout', _UserManage.logoutHandler);
router.post('/password', _UserManage.changePasswordHandler);

/**
 * route to apply
 */
router.post('/record', upload.single('temp?hero123'), function (req, res, next) {
  next();
});

router.post('/record', _ApplyRoom.applyHandler);

router.get('/record', _ApplyRoom.getRecordHandler);

/**
 * route to approve
 */
router.post('/record/:recordID', _ApproveRecord.approveHandler);

/**
 * route to admin
 */
router.post('/admin/login', _AdminManage.adminLoginHandler);