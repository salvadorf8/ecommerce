import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

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

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

/**
 * createStore takes three parameters, third parameter is middlewares
 * later we created the composedEnhancers
 * undefined = preloadedState
 */
export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
