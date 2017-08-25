'use strict';

exports.__esModule = true;
exports.createNamespace = createNamespace;
/**
 * Created by istrauss on 1/4/2017.
 */

function createNamespace(actionTypeArr, namespacePrefix) {
    return actionTypeArr.reduce(function (_namespace, actionType) {
        _namespace[actionType] = namespacePrefix + '_' + actionType;
        return _namespace;
    }, {});
}