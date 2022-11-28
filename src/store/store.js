import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

// SF - comment - #1 root-reducer
import { rootReducer } from './root-reducer';

const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

/**
 * createStore takes three parameters, third parameter is middlewares
 * later we created the composedEnhancers
 * undefined = preloadedState
 */
export const store = createStore(rootReducer, undefined, composedEnhancers);
