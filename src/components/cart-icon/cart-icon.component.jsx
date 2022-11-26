import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import { CartIconContainer, ItemCount, ShoppingCartIcon } from './cart-icon.styles';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingCartIcon className='shoppping-icon' />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;
