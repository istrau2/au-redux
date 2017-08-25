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
export function combineReducersProvideRootState(fnsByName) {
    return (state = {}, action, rootState) => {
        const modifications = Object.keys(fnsByName).reduce((_newState, fnName) => {
            return {
                ..._newState,
                [fnName]: fnsByName[fnName](state[fnName], action, rootState || state)
            };
        }, {});

        return {
            ...state,
            ...modifications
        }
    }
}

export function restrictReducerToNamespace(reducer, namespace) {
    return function (...rest) {
        const state = rest[0];
        const action = rest[1];

        if (state && action.type.indexOf(namespace) !== 0) {
            return state;
        }

        return reducer(...rest);
    }
}
