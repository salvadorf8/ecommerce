import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }

    console.log('SF * type: ', action.type);
    console.log('SF * payload: ', action.payload);
    console.log('SF * currentState: ', store.getState());

    next(action);

    console.log('SF * next state: ', store.getState());
};

const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

/**
 * createStore takes three parameters, third parameter is middlewares
 * later we created the composedEnhancers
 * undefined = preloadedState
 */
export const store = createStore(rootReducer, undefined, composedEnhancers);
