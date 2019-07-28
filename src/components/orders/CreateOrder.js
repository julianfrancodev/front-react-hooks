import React, {Fragment, useEffect, useState} from 'react';
import clientAxios from '../../config/axios';
import FindProduct from "../products/FindProduct";
import Swal from 'sweetalert2';
import CreateOrderQuantity from "./CreateOrderQuantity";
import {withRouter} from "react-router-dom";

const CreateOrder = (props) => {

    const {clientId} = props.match.params;

    const [client, saveClient] = useState({});

    const [find, saveFind] = useState('');

    const [products, saveProducts] = useState([]);

    const [total, saveTotal] = useState(0);

    const queryClient = async () => {
        const res = await clientAxios.get(`/clients/${clientId}`);

        const {_id, name, company, email} = res.data;

        saveClient({
            id: _id,
            name: name,
            company: company,
            email: email
        });

    };

    useEffect(() => {
        queryClient();
        updateTotal();
    }, [products]);


    const findProduct = async (e) => {
        e.preventDefault();

        const resultFind = await clientAxios.post(`/products/find/${find}`);

        console.log(resultFind);

        if (resultFind.data[0]) {

            let productResult = resultFind.data[0];

            productResult.product = resultFind.data[0]._id;
            productResult.quantity = 0;

            saveProducts([...products, productResult])

        } else {
            Swal.fire({
                type: "error",
                title: "No se encontro el producto"
            })
        }

    };

    const readDataFind = (e) => {
        saveFind(e.target.value);
    };


    const removeProduct = (index) => {

        const allProducts = [...products];

        if (allProducts[index].quantity === 0) return;

        allProducts[index].quantity--;

        saveProducts(allProducts);


    };

    const addProduct = (index) => {
        const allProducts = [...products];


        allProducts[index].quantity++;

        saveProducts(allProducts);

    };

    const updateTotal = () => {

        if (products.length === 0) {
            saveTotal(0);
            return;
        }

        let newTotal = 0;


        products.map((product) => newTotal += (product.quantity * product.price));

        saveTotal(newTotal);
    };

    const deleteProduct = (id) => {
        const allProducts = products.filter(product => product._id !== id);

        saveProducts(allProducts);
    };


    const makeOrder = async () => {
        console.log('making order');

        const order = {
            "client": clientId,
            "products": products,
            "total": total
        };

        const res = await clientAxios.post('/orders', order);

        if (res.status === 200) {
            Swal.fire({
                type: 'success',
                title: 'Se agrego la orden',
                text: 'Orden guardada'
            });

        } else {

            Swal.fire({
                type: 'error',
                title: 'No se agrego la orden',
            })
        }

        props.history.push('/orders');

    };


    return (
        <Fragment>
            <main className="caja-contenido col-9">
                <h2>Nuevo Pedido</h2>

                <div className="ficha-cliente">
                    <h3>Datos de Cliente</h3>
                    <p><b>Nombre:</b> {client.name}</p>
                    <p><b>Correo electronico:</b> {client.email}</p>
                    <p><b>Compañia:</b> {client.company}</p>
                </div>


                <FindProduct findProduct={findProduct} readDataFind={readDataFind}/>

                <ul className="resumen">
                    {products.map((product, index) => (
                        <CreateOrderQuantity
                            removeProduct={removeProduct}
                            addProduct={addProduct}
                            key={index}
                            index={index}
                            deleteProduct={deleteProduct}
                            product={product}/>
                    ))}
                </ul>

                <p className="total">Total a Pagar: <span>$ {total}</span></p>

                {total > 0 ? (
                    <form onSubmit={() => makeOrder()}>

                        <input
                            type="submit"
                            className="btn btn-verde btn-block"
                            value="Realizar Pedido"
                        />

                    </form>
                ) : null}
            </main>
        </Fragment>
    );
};

export default withRouter(CreateOrder);