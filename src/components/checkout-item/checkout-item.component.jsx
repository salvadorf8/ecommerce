import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import { clearItemFromCart, addItemToCart, removeItemFromCart } from '../../store/cart/cart.action';
import { CheckoutItemContainer, Arrow, BaseSpan, ImageContainer, Quantity, Value, RemoveButton } from './checkout-item.styles';

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    // reasons for coding out Handler's
    // 1) if these methods ever change, easier to see where they are -readability
    // 2) actually be able to optimize code later
    const clearItemHandler = () => {
        dispatch(clearItemFromCart(cartItems, cartItem));
    };

    const addItemHandler = () => {
        dispatch(addItemToCart(cartItems, cartItem));
    };

    const removeItemHandler = () => {
        dispatch(removeItemFromCart(cartItems, cartItem));
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
