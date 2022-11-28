import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';
import { categoriesReducer } from './categories/category.reducer';

export const rootReducer = combineReducers({
    // key and values of the name of all reducers
    user: userReducer,
    categories: categoriesReducer
});
