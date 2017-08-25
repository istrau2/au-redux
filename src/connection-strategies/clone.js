/**
 * Created by istrauss on 8/25/2017.
 */

import _clone from 'lodash.clone';

export function clone(object, property, newValue) {
    object[property] = _clone(newValue);
}
