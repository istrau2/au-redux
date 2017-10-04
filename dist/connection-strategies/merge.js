'use strict';

exports.__esModule = true;
exports.merge = merge;

var _lodash = require('lodash/merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function merge(object, property, newValue) {
  _merge(object[property], newValue);
} /**
   * Created by istrauss on 8/25/2017.
   */
