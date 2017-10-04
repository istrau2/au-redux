/**
 * Created by istrauss on 9/11/2017.
 */

import _get from 'lodash/get';
import {TaskQueue, Container, subscriberCollection} from 'aurelia-framework';
import {Store} from '../store';
import {direct} from '../connection-strategies/index';

const defaultOptions = {
    strategy: direct
};

@subscriberCollection()
export class ConnectedObserver {

    /**
     * The connected decorator, connects the property to the store by subscribing it to the store for changes.
     * @param property - The property (on obj) to connect store changes to.
     * @param obj - The object to connect store changes to.
     * @param storePath - The path (in the store) to get connection changes from.
     * @param [options]
     * @param [options.strategy=direct] - The connection strategy to use when after retrieval from store. By default the direct strategy is used.
     *                                    A strategy should be a function of the following form:
     *                                    (object, property, newValue) => {
     *                                          ensures the newValue is somehow provided to object. The old value can simply be obtained from object[property]
     *                                    }
     * @returns {Function}
     */
    constructor(property, obj, storePath, options = {}) {
        this.taskQueue = Container.instance.get(TaskQueue);
        this.store = Container.instance.get(Store);
        this.property = property;
        this.obj = obj;
        this.storePath = storePath;
        this.options = {
            ...defaultOptions,
            ...options
        };

        obj._connected_observers = obj._connected_observers || {};
        obj._connected_observers[property] = this;
    }

    getValue() {
        return this.value;
    }

    setValue(newValue) {
        const descriptor = Object.getOwnPropertyDescriptor(this.obj.prototype, this.property);
        return descriptor.set.call(this.obj, newValue);
    }

    connect() {
        this.unsubscribeFromStore = this.store.subscribe(this.updateFromStore.bind(this));
        this.updateFromStore();
    }

    disconnect() {
        this.unsubscribeFromStore();
    }

    updateFromStore() {
        const storeValue = _get(this.store.getState(), this.storePath);

        if (this.storeValue !== storeValue) {
            this.storeValue = storeValue;
            this.oldValue = this.value;
            this.value = this.options.strategy(this.storeValue, this.value, this.obj);

            this.notifySubscribers();
        }
    }

    notifySubscribers() {
        this.taskQueue.queueMicroTask(() => {
            this.callSubscribers(this.value, this.oldValue);
        });
    }

    subscribe(context, callable) {
        if (!this.hasSubscribers()) {
            this.connect();
        }
        this.addSubscriber(context, callable);
    }

    unsubscribe(context, callable) {
        if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
            this.disconnect();
            this.oldValue = undefined;
        }
    }
}
