/**
 * Created by istrauss on 8/25/2017.
 */

export function assign(newValue, oldValue) {
    return oldValue ? Object.assign(oldValue, newValue) : newValue;
}
