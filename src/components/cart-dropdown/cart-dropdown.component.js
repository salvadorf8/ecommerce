import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { CartContext } from '../../context/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-item'>
                {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
            </div>
            <Link className='nav-link' to='/cart'>
                <Button>GO TO CHECKOUT</Button>
            </Link>
        </div>
    );
};

export default CartDropdown;
