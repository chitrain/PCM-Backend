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

var storage = _multer2.default.diskStorage({
  destination: function destination(req, file, cb) {
    return cb(null, './tempStore');
  },

  filename: function filename(req, file, cb) {
    var ff = file.originalname.split('.');
    var current = Date.now();
    cb(null, file.fieldname + '-' + current + '.' + ff[ff.length - 1]);
  }
});

var upload = exports.upload = (0, _multer2.default)({ storage: storage });
var router = exports.router = (0, _express.Router)();

router.all('*', function (req, res, next) {
  // res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  // res.header('Access-Control-Allow-Headers', '*')
  // res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  // res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Expose-Headers', 'Content-Type, token');
  next();
});
router.use(function (req, res, next) {
  var url = req.originalUrl;

  // admin
  if (url.indexOf('admin') > -1) {
    if (url.indexOf('login') > -1 || req.session.admin) {
      next();
      return;
    }
    res.json({ error: 1, msg: '没有权限' });
    return;
  }

  // user
  console.log('malegeji!!!!!!!');
  // console.log(req.session.user)
  // console.log(req)
  if (req.session.user) {
    next();
  } else {
    if (url.indexOf('login') > -1 || url.indexOf('register') > -1) {
      next();
    } else {
      res.json({ error: 1, msg: '尚未登录' });
    }
  }
});

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
router.get('/user', _UserManage.getUserInfoHandler);
/**
 * route to apply
 */
router.post('/record', upload.single('file'), function (req, res, next) {
  (0, _ApplyRoom.applyHandler)(req, res);
});

router.post('/record', _ApplyRoom.applyHandler);

router.get('/record', _ApplyRoom.getRecordHandler);

/**
 * route to approve
 */
router.post('/admin/record/:recordID', _ApproveRecord.approveHandler);
router.get('/admin/record', _ApproveRecord.getAllRecordHandler);

/**
 * route to admin
 */
router.post('/admin/login', _AdminManage.adminLoginHandler);
router.get('/admin/logout', _AdminManage.adminLogoutHandler);

router.get('/admin/download', _ApproveRecord.downloadHandler);