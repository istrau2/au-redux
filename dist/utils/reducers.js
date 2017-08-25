"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.combineReducersProvideRootState = combineReducersProvideRootState;
exports.restrictReducerToNamespace = restrictReducerToNamespace;
/**
 * Created by Ishai on 12/21/2016.
 */

/**
 * Produces a reducer by combining reducers just like the native redux.combineReducers while providing rootState to each reducer.
 * In order for the correct rootState to be provided, all of your reducers need to use combineReducersProvideRootState.
 * In other words, use this instead of the native combineReducers functionality all the way down your reducer chain.
 * @param fnsByName
 * @returns {Function}
 */
function combineReducersProvideRootState(fnsByName) {
    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var action = arguments[1];
        var rootState = arguments[2];

        var modifications = Object.keys(fnsByName).reduce(function (_newState, fnName) {
            var _extends2;

            return _extends({}, _newState, (_extends2 = {}, _extends2[fnName] = fnsByName[fnName](state[fnName], action, rootState || state), _extends2));
        }, {});

        return _extends({}, state, modifications);
    };
}

function restrictReducerToNamespace(reducer, namespace) {
    return function () {
        var state = arguments.length <= 0 ? undefined : arguments[0];
        var action = arguments.length <= 1 ? undefined : arguments[1];

        if (state && action.type.indexOf(namespace) !== 0) {
            return state;
        }

        return reducer.apply(undefined, arguments);
    };
}