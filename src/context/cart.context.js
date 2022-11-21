import { createContext, useEffect, useState } from 'react';

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

const removeCartItemCompletly = (cartItems, cartItemToClear) => {
    return cartItems.filter((item) => item.id !== cartItemToClear.id);
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    grandTotal: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);

    const addItemToCart = (productToAdd) => {
        // addCountToTotal();
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    };

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(removeCartItemCompletly(cartItems, cartItemToClear));
    };

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newGrandTotal = cartItems.reduce((value, item) => value + item.price * item.quantity, 0);
        setGrandTotal(newGrandTotal);
    }, [cartItems]);

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart, clearItemFromCart, grandTotal };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
