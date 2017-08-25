/**
 * Created by istrauss on 8/25/2017.
 */

import _cloneDeep from 'lodash.clonedeep';

export function clone(object, property, newValue) {
    object[property] = _cloneDeep(newValue);
}
