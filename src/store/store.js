import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './root-reducer';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 *  only if environment === development render the logger
 *  the .filter(Boolean) what this optimization does is it filters out anything that is not true
 *  (works because its an array)
 * */
const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(Boolean);

const composedEnhancers = compose(applyMiddleware(...middleWares));

/**
 * createStore takes three parameters, third parameter is middlewares
 * later we created the composedEnhancers
 * undefined = preloadedState
 */
export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
