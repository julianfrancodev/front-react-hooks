import React, {Fragment, useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import clientAxios from '../../config/axios';
import {withRouter} from "react-router-dom";

const EditClient = (props) => {

    const {clientId} = props.match.params;

    const [client, saveClient] = useState({
        name: '',
        lastname: '',
        company: '',
        email: '',
        phone: ''
    });

    const queryApi = async () => {
        await clientAxios.get(`/clients/${clientId}`)
            .then((res) => {
                const {_id, name, lastname, company, email, phone} = res.data;
                saveClient({
                    ...client,
                    id: _id,
                    name: name,
                    lastname: lastname,
                    company: company,
                    email: email,
                    phone: phone
                })
            });
    };

    useEffect(() => {
        queryApi();
    },[]);


    const updateState = (e) => {
        saveClient({
            ...client,
            // take every element name and set the value
            [e.target.name]: e.target.value
        });

    };

    const addClient = (e) => {
        e.preventDefault();
        clientAxios.put(`/clients/${client.id}`, client
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
                    title: 'Se actualizo el cliente',
                    text: 'Cliente guardado'
                });

                props.history.push('/clients');
            }
        })
    };

    const validateClient = () => {
        const {name, lastname, company, phone, email} = client;
        return (!name || !lastname || !company || !phone || !email);

    };

    return (
        <Fragment>
            <main className="caja-contenido col-9">
                <h2>Editar Cliente</h2>

                <form onSubmit={addClient}>
                    <legend>Llena todos los campos*</legend>

                    <div className="campo">
                        <label>Nombre:</label>
                        <input type="text" onChange={updateState} defaultValue={client.name}
                               placeholder="Nombre Cliente" name="name"/>
                    </div>

                    <div className="campo">
                        <label>Apellido:</label>
                        <input type="text" onChange={updateState} defaultValue={client.lastname}
                               placeholder="Apellido Cliente" name="lastname"/>
                    </div>

                    <div className="campo">
                        <label>Empresa:</label>
                        <input type="text" onChange={updateState} defaultValue={client.company}
                               placeholder="Empresa Cliente" name="company"/>
                    </div>

                    <div className="campo">
                        <label>Email:</label>
                        <input type="email" onChange={updateState} defaultValue={client.email}
                               placeholder="Email Cliente" name="email"/>
                    </div>

                    <div className="campo">
                        <label>Teléfono:</label>
                        <input type="tel" onChange={updateState} defaultValue={client.phone}
                               placeholder="Teléfono Cliente" name="phone"/>
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

export default withRouter(EditClient);