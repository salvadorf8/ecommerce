import { createAction } from '../../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES } from './cart.types';

const addCartItem = (cartItems, productToAdd) => {
    const itemExists = cartItems.find((item) => item.id === productToAdd.id);

    // if (itemExists) {
    //     return cartItems.map((item) => (item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item));
    // }

    // easier to read
    if (itemExists) {
        return cartItems.map((item) => {
            if (item.id === productToAdd.id) {
                return { ...item, quantity: item.quantity + 1 };
            } else {
                return item;
            }
        });
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
    const itemExists = cartItems.find((item) => item.id === cartItemToRemove.id);

    if (itemExists.quantity === 1) {
        return cartItems.filter((item) => item.id !== cartItemToRemove.id);
    }

    return cartItems.map((item) => {
        if (item.id === cartItemToRemove.id) {
            return { ...item, quantity: item.quantity - 1 };
        } else {
            return item;
        }
    });
};

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((item) => item.id !== cartItemToClear.id);
};

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
