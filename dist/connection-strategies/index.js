'use strict';

exports.__esModule = true;

var _assign = require('./assign');

Object.keys(_assign).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _assign[key];
    }
  });
});

var _clone = require('./clone');

Object.keys(_clone).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _clone[key];
    }
  });
});

var _cloneDeep = require('./clone-deep');

Object.keys(_cloneDeep).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _cloneDeep[key];
    }
  });
});

var _direct = require('./direct');

Object.keys(_direct).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _direct[key];
    }
  });
});

var _merge = require('./merge');

Object.keys(_merge).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _merge[key];
    }
  });
});