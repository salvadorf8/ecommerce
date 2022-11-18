import { useContext } from 'react';

import './product-card.styles.scss';

import { CartContext } from '../../context/cart.context';
import Button from '../button/button.component';

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const { cart, setCart } = useContext(CartContext);

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType='inverted'>ADD TO CART</Button>
        </div>
    );
};

export default ProductCard;
