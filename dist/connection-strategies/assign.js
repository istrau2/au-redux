"use strict";

exports.__esModule = true;
exports.assign = assign;
/**
 * Created by istrauss on 8/25/2017.
 */

function assign(object, property, newValue) {
  Object.assign(object[property], newValue);
}