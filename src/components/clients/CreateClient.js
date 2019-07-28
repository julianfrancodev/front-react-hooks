import React, {Fragment, useState} from 'react';
import Swal from 'sweetalert2';
import clientAxios from '../../config/axios';
import {withRouter} from "react-router-dom";

const CreateClient = ({history}) => {

    const [client, saveClient] = useState({
        name: '',
        lastname: '',
        company: '',
        email: '',
        phone: ''
    });

    const updateState = (e) => {
        saveClient({
            ...client,
            // take every element name and set the value
            [e.target.name]: e.target.value
        });

    };

    const addClient = async (e) => {
        e.preventDefault();
        await clientAxios.post('/clients', client
        ).then(res => {
            if (res.data.code === 11000) {

                Swal.fire({
                    type: 'error',
                    title: 'No se agrego el cliente',
                    text: 'El cliente ya esta registrado'
                })
            } else {

                Swal.fire({
                    type: 'success',
                    title: 'Se agrego el cliente',
                    text: 'Cliente guardado'
                });

                history.push('/');
            }
        })
    };

    const validateClient = () => {
        const {name, lastname, company, phone, email} = client;
        return (!name.length || !lastname.length || !company.length || !phone.length || !email.length);
    };

    return (
        <Fragment>
            <main className="caja-contenido col-9">
                <h2>Nuevo Cliente</h2>

                <form onSubmit={addClient}>
                    <legend>Llena todos los campos*</legend>

                    <div className="campo">
                        <label>Nombre:</label>
                        <input type="text" onChange={updateState} placeholder="Nombre Cliente" name="name"/>
                    </div>

                    <div className="campo">
                        <label>Apellido:</label>
                        <input type="text" onChange={updateState} placeholder="Apellido Cliente" name="lastname"/>
                    </div>

                    <div className="campo">
                        <label>Empresa:</label>
                        <input type="text" onChange={updateState} placeholder="Empresa Cliente" name="company"/>
                    </div>

                    <div className="campo">
                        <label>Email:</label>
                        <input type="email" onChange={updateState} placeholder="Email Cliente" name="email"/>
                    </div>

                    <div className="campo">
                        <label>Teléfono:</label>
                        <input type="tel" onChange={updateState} placeholder="Teléfono Cliente" name="phone"/>
                    </div>

                    <div className="enviar">
                        <input type="submit" disabled={validateClient()} className="btn btn-azul"
                               value="Agregar Cliente"/>
                    </div>

                </form>

            </main>
        </Fragment>
    );

};

export default withRouter(CreateClient);