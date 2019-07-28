import React, {Fragment} from 'react';
import ProductsOrder from "./ProductsOrder";

const Order = (props) => {

    const {_id, client, products, total} = props.order;
    return (

        <Fragment>
            <li className="pedido">
                <div className="info-pedido">
                    <p className="id">ID: {_id}</p>
                    <p className="nombre">Cliente: {client.name}</p>

                    <div className="articulos-pedido">
                        <p className="productos">Artículos Pedido: </p>
                        <ul>
                            {
                                products.map((product, index) => (
                                    <ProductsOrder
                                        key={index}
                                        product={product}
                                    />
                                ))
                            }
                        </ul>
                    </div>
                    <p className="total">Total: ${total} </p>
                </div>
                <div className="acciones">
                    <button type="button" className="btn btn-rojo btn-eliminar">
                        Eliminar Pedido
                    </button>
                </div>
            </li>

        </Fragment>
    );

};

export default Order;