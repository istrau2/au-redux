/**
 * Created by istrauss on 1/7/2017.
 */

import {Container} from 'aurelia-framework';
import {createStore} from 'redux';

export class Store {
    static createAndRegister(rootReducer, enhancer){
        const store = createStore(rootReducer, enhancer);
        Container.instance.registerInstance(Store, store);
    }
}
