import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import { CheckoutItemContainer, Arrow, BaseSpan, ImageContainer, Quantity, Value, RemoveButton } from './checkout-item.styles';

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);

    // reasons for coding out Handler's
    // 1) if these methods ever change, easier to see where they are -readability
    // 2) actually be able to optimize code later
    const clearItemHandler = () => {
        clearItemFromCart(cartItem);
    };

    const addItemHandler = () => {
        addItemToCart(cartItem);
    };

    const removeItemHandler = () => {
        removeItemFromCart(cartItem);
    };

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>&#10095;</Arrow>
            </Quantity>
            <BaseSpan>{price}</BaseSpan>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
};

export default CheckoutItem;
