'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

/**
 * make status number->string
 * @param status {Number}
 * @return {String} represents what status means
 */
var extractStatus = exports.extractStatus = function extractStatus(status) {
  var st = ['等待', '通过', '拒绝'];
  return st[status];
};