import React, {Fragment, useState} from 'react';
import Swal from 'sweetalert2';
import clientAxios from "../../config/axios";
import {withRouter} from "react-router-dom";

const CreateProduct = (props) => {

    const [product, saveProduct] = useState({
        name: '',
        price: ''
    });

    const [file, saveFile] = useState('');

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

    const handelSaveProduct = async (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', Number(product.price));
        formData.append('image', file);


        try {

            const res = await clientAxios.post('/products', formData, {
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
                <h2>Nuevo Producto</h2>

                <form onSubmit={handelSaveProduct}>
                    <legend>Llena todos los campos</legend>

                    <div className="campo">
                        <label>Nombre:</label>
                        <input onChange={handleSaveProductInput} type="text" placeholder="Nombre Producto" name="name"/>
                    </div>

                    <div className="campo">
                        <label>Precio:</label>
                        <input onChange={handleSaveProductInput} type="number" name="price" min="0.00" step="0.01"
                               placeholder="price"/>
                    </div>

                    <div className="campo">
                        <label>Imagen:</label>
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
export default withRouter(CreateProduct);
