import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import Swal from 'sweetalert2';
import clientAxios from "../../config/axios";


const Product = (props) => {

    const {_id, name, price, image} = props.product;


    const deleteProduct = async () => {

        Swal.fire({
            type: 'warning',
            title: 'Estas seguro?',
            text: 'No podras revertir los cambios',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminalo'

        }).then(async (result) => {
            if (result.value) {
                await clientAxios.delete(`/products/${_id}`)
                    .then((res) => (
                        Swal.fire({
                            type: 'success',
                            title: 'Producto eliminado',
                        })
                    ))
            }
        });


    };

    return (
        <Fragment>

            <li className="producto">
                <div className="info-producto">
                    <p className="nombre">{name}</p>
                    <p className="precio">${price} </p>
                    {
                        image ? (
                            <img src={`http://localhost:5000/${image}`} alt={'jpeg'}/>

                        ) : null

                    }


                </div>
                <div className="acciones">
                    <Link to={`/products/editproduct/${_id}`} className="btn btn-azul">
                        <i className="fas fa-pen-alt"> </i>
                        Editar Producto
                    </Link>

                    <button onClick={deleteProduct} type="button" className="btn btn-rojo btn-eliminar">
                        <i className="fas fa-times"> </i>
                        Eliminar Cliente
                    </button>
                </div>
            </li>

        </Fragment>
    )
};
export default Product;