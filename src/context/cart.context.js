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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    const addItemToCart = (productToAdd) => {
        // addCountToTotal();
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    // This version recounts all of the items.quantity in the cart
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    // was my way, which increment
    // const addCountToTotal = () => {
    //     setCartCount(cartCount + 1);
    // };

    // const removeCountFromTotal = () => {
    //     setCartCount(cartCount - 1);
    // };

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
