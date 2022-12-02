import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import { rootReducer } from './root-reducer';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 *  SF - comment - only if environment === development render the logger
 *  the .filter(Boolean) what this optimization does is it filters out anything that is not true
 *  (works because its an array)
 * */
const middleWares = [process.env.NODE_ENV !== 'production' && logger, thunk].filter(Boolean);

/**
 * SF - comment - nice tool to use chrome extension redux tool
 */
const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

/**
 * SF - comment - createStore takes three parameters, third parameter is middlewares
 * later we created the composedEnhancers
 * undefined = preloadedState
 */
export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
