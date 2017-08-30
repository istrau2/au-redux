/**
 * Created by istrauss on 8/25/2017.
 */

import _get from 'lodash.get';
import {Container} from 'aurelia-dependency-injection';
import {Store} from '../store';
import {direct} from '../connection-strategies/index';

const defaultOptions = {
    strategy: direct
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
export function connected(path, options) {
    options = {
        ...options,
        ...defaultOptions
    };

    return function(target, name, descriptor) {
        if (!path) {
            throw new Error('in order for ' + name + ' to be connected, a path must be specificed.');
        }

        const store = Container.instance.get(Store);
        const bind = target.bind;
        const unbind = target.bind;
        let unsubscribeFromStore;

        target.bind = function (...args) {
            const assignFromStore = () => {
                options.strategy(this, name, _get(store.getState(), path));

                if (target[name + 'Changed']) {
                    target[name + 'Changed'].call(this);
                }
            };

            unsubscribeFromStore = store.subscribe(assignFromStore);
            assignFromStore();

            if (bind) {
                bind.apply(this, args);
            }
        };

        target.unbind = function(...args) {
            unsubscribeFromStore();

            if (unbind) {
                unbind.apply(this, args);
            }
        }
    }
}
