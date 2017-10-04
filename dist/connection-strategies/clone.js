'use strict';

exports.__esModule = true;
exports.clone = clone;

var _lodash = require('lodash/clone');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function clone(object, property, newValue) {
  object[property] = (0, _lodash2.default)(newValue);
} /**
   * Created by istrauss on 8/25/2017.
   */
