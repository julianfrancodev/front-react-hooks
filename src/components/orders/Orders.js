import React, {Fragment, useState, useEffect} from 'react';
import Order from "./Order";
import clientAxios from "../../config/axios";


const Orders = () => {

    const [orders, saveOrders] = useState([]);

    const queryOrders = async () => {

        const res = await clientAxios.get('/orders');

        saveOrders(res.data);

    };

    useEffect(() => {

        queryOrders();

    }, [orders]);

    return (
        <Fragment>
            <main className="caja-contenido col-9">
                <h2>Pedidos</h2>

                <ul className="listado-pedidos">

                    {
                        orders.map((order) => (
                            <Order key={order._id} order={order}/>
                        ))
                    }
                </ul>
            </main>
        </Fragment>
    );
};

export default Orders;