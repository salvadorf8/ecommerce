import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';
import { categoriesReducer } from './categories/category.reducer';
import { cartReducer } from './cart/cart.reducer';

export const rootReducer = combineReducers({
    // key and values of the name of all reducers
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer
});
