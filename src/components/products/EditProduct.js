import React, {Fragment, useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import clientAxios from "../../config/axios";
import {withRouter} from "react-router-dom";

const EditProduct = (props) => {

    const {productId} = props.match.params;


    const [product, saveProduct] = useState({
        name: '',
        price: '',
        image: ''
    });

    const [file, saveFile] = useState('');

    const queryApi = async () => {

        const productApi = await clientAxios.get(`/products/${productId}`);

        const {name, price, image} = productApi.data;

        saveProduct({
            name: name,
            price: price,
            image: image
        });


    };

    useEffect(() => {
        queryApi();
    }, []);


    const handleSaveProductInput = (e) => {
        e.preventDefault();

        saveProduct({
            ...product,
            [e.target.name]: e.target.value
        });


    };

    const handleFile = (e) => {
        saveFile(e.target.files[0])
    };

    const handleUpdateProduct = async (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', Number(product.price));
        formData.append('image', file);

        try {

            const res = await clientAxios.put(`/products/${productId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.status === 200) {
                Swal.fire({
                    type: 'success',
                    title: 'Producto Persistido',
                    text: 'Mira tus productos'
                })
            }


            props.history.push('/products');

        } catch (e) {
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: 'vuelve a intentarlo'
            })
        }
    };


    return (
        <Fragment>
            <main className="caja-contenido col-9">
                <h2>Editar Producto</h2>

                <form onSubmit={handleUpdateProduct}>
                    <legend>Llena todos los campos</legend>

                    <div className="campo">
                        <label>Nombre:</label>
                        <input onChange={handleSaveProductInput} defaultValue={product.name} type="text"
                               placeholder="Nombre Producto" name="name"/>
                    </div>

                    <div className="campo">
                        <label>Precio:</label>
                        <input onChange={handleSaveProductInput} defaultValue={product.price} type="number" name="price"
                               min="0.00" step="0.01"
                               placeholder="price"/>
                    </div>

                    <div className="campo">
                        <label>Imagen:</label>
                        {
                            product.image ? (
                                <img src={`http://localhost:5000/${product.image}`} alt={'jpeg'}/>

                            ) : null

                        }
                        <input onChange={handleFile} type="file" name="imagen"/>
                    </div>

                    <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Agregar Producto"/>
                    </div>
                </form>

            </main>
        </Fragment>
    )
};
export default withRouter(EditProduct);
