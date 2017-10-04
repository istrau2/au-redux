'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by istrauss on 8/25/2017.
                                                                                                                                                                                                                                                                   */

exports.connected = connected;

var _lodash = require('lodash/get');

var _lodash2 = _interopRequireDefault(_lodash);

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _store = require('../store');

var _index = require('../connection-strategies/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {
    strategy: _index.direct
};

/**
 * The connected decorator, connects the property to the store by subscribing it to the store for changes.
 * @param path - The path by which to get the desired value from the store.
 * @param [options]
 * @param [options.strategy=direct] - The connection strategy to use when after retrieval from store. By default the direct strategy is used.
 *                                    A strategy should be a function of the following form:
 *                                    (object, property, newValue) => {
 *                                          ensures the newValue is somehow provided to object. The old value can simply be obtained from object[property]
 *                                    }
 * @returns {Function}
 */
function connected(path, options) {
    options = _extends({}, options, defaultOptions);

    return function (target, name, descriptor) {
        if (!path) {
            throw new Error('in order for ' + name + ' to be connected, a path must be specificed.');
        }

        var store = _aureliaDependencyInjection.Container.instance.get(_store.Store);
        var bind = target.bind;
        var unbind = target.bind;
        var unsubscribeFromStore = void 0;

        target.bind = function () {
            var _this = this;

            unsubscribeFromStore = store.subscribe(function () {
                options.strategy(_this, name, (0, _lodash2.default)(store.getState(), path));
            });
            options.strategy(this, name, (0, _lodash2.default)(store.getState(), path));

            if (bind) {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                bind.apply(this, args);
            }
        };

        target.unbind = function () {
            unsubscribeFromStore();

            if (unbind) {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                unbind.apply(this, args);
            }
        };
    };
}
