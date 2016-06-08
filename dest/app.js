'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _onHeaders = require('on-headers');

var _onHeaders2 = _interopRequireDefault(_onHeaders);

var _router = require('./router');

var _cleanup = require('./utils/cleanup');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

var app = exports.app = (0, _express2.default)();

// initialize databse
// define schema, drop legacy tables
(0, _cleanup.cleanup)();

var PORT = _config2.default.url.split(':')[2];

app.use(function (req, res, next) {
  (0, _onHeaders2.default)(res, function () {
    var cookie = res.getHeader('set-cookie');
    if (cookie) res.setHeader('token', cookie);
  });
  next();
});

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _expressSession2.default)({
  name: 'sid',
  secret: '**im a secret**',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: false
  }
}));

// load router
app.use('/', _router.router);

app.listen(PORT, function () {
  console.log('server listening at port ' + PORT + '...');
});