import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import Swal from 'sweetalert2';
import clientAxios from '../../config/axios';

const Client = (props) => {

    const {_id, name, lastname, email, phone, company} = props.client;

    const deleteClient = () => {

        Swal.fire({
            type:'warning',
            title: 'Estas seguro?',
            text: 'No podras revertir los cambios',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminalo'

        }).then(async (result) => {
                if (result.value) {

                   await clientAxios.delete(`/clients/${_id}`)
                        .then((res)=>{

                            Swal.fire({
                                type:'success',
                                title:'Cliente eliminado',
                            })
                        });

                }

            }
        )

    };

    return (
        <Fragment>
            <li className="cliente">
                <div className="info-cliente">
                    <p className="nombre">{name}</p>
                    <p className="empresa">{lastname}</p>
                    <p>{email}</p>
                    <p>{phone}</p>
                    <p>{company}</p>
                </div>
                <div className="acciones">
                    <Link to={`/clients/editclient/${_id}`} className="btn btn-azul">
                        <i className="fas fa-pen-alt"> </i>
                        Editar Cliente
                    </Link>

                    <Link to={`/orders/createorder/${_id}`} className="btn btn-amarillo">
                        <i className="fas fa-pen-alt"> </i>
                       Generar Pedido
                    </Link>
                    <button
                        onClick={deleteClient}
                        type="button" className="btn btn-rojo btn-eliminar">
                        <i className="fas fa-times"> </i>
                        Eliminar Cliente
                    </button>
                </div>
            </li>
        </Fragment>
    );
};

export default Client;