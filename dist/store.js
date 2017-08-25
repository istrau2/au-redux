'use strict';

exports.__esModule = true;
exports.Store = undefined;

var _aureliaFramework = require('aurelia-framework');

var _redux = require('redux');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Created by istrauss on 1/7/2017.
                                                                                                                                                           */

var Store = exports.Store = function () {
    function Store() {
        _classCallCheck(this, Store);
    }

    Store.createAndRegister = function createAndRegister(rootReducer, enhancer) {
        var store = (0, _redux.createStore)(rootReducer, enhancer);
        _aureliaFramework.Container.instance.registerInstance(Store, store);
    };

    return Store;
}();