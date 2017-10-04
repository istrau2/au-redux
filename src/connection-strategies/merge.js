/**
 * Created by istrauss on 8/25/2017.
 */

import _cloneDeep from 'lodash/merge';

export function merge(newValue, oldValue) {
    return oldValue ? _merge(oldValue, newValue) : newValue;
}
