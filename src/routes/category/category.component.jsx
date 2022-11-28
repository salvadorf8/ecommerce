import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProductCard from '../../components/product-card/product-card.component';

import { CategoryContainer, CategoryTitle } from './category.styles';
import { selectCategoriesMap } from '../../store/categories/categories.selector';

const Category = () => {
    const { category } = useParams();
    console.log('SF - render/re-rendering category.component.js', category);
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        console.log('SF - useEffect fired calling setProducts');
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>{products && products.map((product) => <ProductCard key={product.id} product={product} />)}</CategoryContainer>
        </Fragment>
    );
};

export default Category;