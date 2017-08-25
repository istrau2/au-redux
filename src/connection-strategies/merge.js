/**
 * Created by istrauss on 8/25/2017.
 */

import _cloneDeep from 'lodash.merge';

export function merge(object, property, newValue) {
    _merge(object[property], newValue);
}
