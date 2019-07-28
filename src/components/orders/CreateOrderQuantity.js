import React, {Fragment} from 'react';

const CreateOrderQuantity = (props) => {

    const {_id,name, price, quantity} = props.product;

    const {removeProduct, addProduct, deleteProduct, index} = props;


    return (
        <Fragment>

            <li>
                <div className="texto-producto">
                    <p className="nombre">{name}</p>
                    <p className="precio">${price}</p>
                </div>
                <div className="acciones">
                    <div className="contenedor-cantidad">
                        <i onClick={() => removeProduct(index)} className="fas fa-minus">&#8722;</i>
                        <p type="text" name="cantidad">{quantity}</p>
                        <i onClick={() => addProduct(index)} className="fas fa-plus">&#43;</i>
                    </div>
                    <button onClick={() => deleteProduct(_id)} type="button" className="btn btn-rojo">
                        <i className="fas fa-minus-circle"></i>
                        Eliminar Producto
                    </button>
                </div>
            </li>
        </Fragment>
    )
};

export default CreateOrderQuantity;