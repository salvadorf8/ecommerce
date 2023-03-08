import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

// SF - now that we have a <Spinner /> we no longer need to persist categories, the only thing we need to persist is cart
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// SF - only if environment === development render the logger
// the .filter(Boolean) what this optimization does is it filters out anything that is not true
// (works because its an array)
const middleWares = [process.env.NODE_ENV !== 'production' && logger, thunk].filter(Boolean);

// SF - nice tool to use chrome extension redux tool
const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

//  SF - createStore takes three parameters, third parameter is middlewares
//  - undefined = preloadedState
//  - later we created the composedEnhancers
export const store = createStore(persistedReducer, undefined, composedEnhancers);
export const persistor = persistStore(store);
