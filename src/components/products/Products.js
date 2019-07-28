import React, {Fragment, useEffect, useState} from 'react';
import Product from "./Product";
import clientAxios from "../../config/axios";
import {Link} from "react-router-dom";
import Spinner from "../layout/Spinner";


const Products = () => {

    const [products, saveProducts] = useState([]);

    const queryApi = async () => {

        const queryProducts = await clientAxios.get('/products');
        saveProducts(queryProducts.data)
    };

    useEffect(() => {
        queryApi();
    }, [products]);

    if (!products.length)
        return (
            <   Fragment>
                <Link to="/products/createproduct" className="btn btn-verde nvo-cliente">
                    <i className="fas fa-plus-circle"> </i>
                    Nuevo Producto
                </Link>
                <Spinner/>
            </Fragment>
        );

    return (
        <Fragment>
            <main className="caja-contenido col-9">
                <h2>Productos</h2>

                <Link to="/products/createproduct" className="btn btn-verde nvo-cliente">
                    <i className="fas fa-plus-circle"> </i>
                    Nuevo Producto
                </Link>

                <ul className="listado-productos">

                    {
                        products.map((product) => (
                            <Product key={product._id} product={product}/>
                        ))
                    }


                </ul>
            </main>
        </Fragment>
    );
};

export default Products;