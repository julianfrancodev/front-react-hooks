import React, {Fragment} from 'react';

const ProductsOrder = (props) => {

    const {name, price, quantity} = props.product.product;

    return (
        <Fragment>
            <li>
                <p>{name}</p>
                <p>Precio: ${price}</p>
                <p>Cantidad: {quantity}</p>
            </li>
        </Fragment>
    );

};

export default ProductsOrder;