import { useContext } from 'react';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../context/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    };

    // initially I used a Link, but course showed using useNavigate hook
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-item'>
                {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
            </div>

            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </div>
    );
};

export default CartDropdown;
