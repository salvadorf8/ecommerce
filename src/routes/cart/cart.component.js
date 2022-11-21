import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

// import './cart.styles.scss';

const Cart = () => {
    const { cartItems, removeCountToTotal } = useContext(CartContext);

    return (
        <div className='cart-container'>
            {cartItems.map((item) => {
                return (
                    <div>
                        <div>{item.name}</div>
                        <div onClick={removeCountToTotal}>X</div>
                    </div>
                );
            })}
        </div>
    );
};

export default Cart;
