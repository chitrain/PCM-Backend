'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = undefined;

var _express = require('express');

var _UserManage = require('./controllers/UserManage');

var _ApplyRoom = require('./controllers/ApplyRoom');

var router = exports.router = (0, _express.Router)(); /**
                                                       * @author Yujie Li
                                                       * @email im_yujie@foxmail.com
                                                       */

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
router.post('/record', _ApplyRoom.applyHandler);
router.get('/record', _ApplyRoom.getRecordHandler);