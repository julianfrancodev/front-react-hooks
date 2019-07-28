import React, {Fragment, useEffect, useState, useContext} from 'react';
import clientAxios from '../../config/axios';
import Client from "./Client";
import {Link, withRouter} from "react-router-dom";
import Spinner from "../layout/Spinner";
import {Ccontext} from "../../context/Ccontext";
import Swal from 'sweetalert2';

const Clients = (props) => {

    // clients is like state and saveClients is like this.setState
    const [clients, saveClients] = useState([]);

    // use Context values

    const [auth] = useContext(Ccontext);

    useEffect(() => {
        queryApi();
    }, [clients]);


    const queryApi = async () => {

        if (auth.token !== null) {

            try {
                const clientsQuery = await clientAxios.get('/clients', {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                saveClients(clientsQuery.data);
            } catch (error) {

                if (error.message === 'Request failed with status code 500') {
                    localStorage.removeItem('token');
                    props.history.push('/log-in');
                }
                props.history.push('/log-in');
            }
        } else {

            props.history.push('/log-in');
            Swal.fire({
                type: 'warning',
                title: 'Oh!, Lugar Equivocado :(',
                text: 'Ingresa Nuevamente'
            })
        }
    };
    if (!clients) {
        return (
            <Fragment>
                <Spinner/>
            </Fragment>
        );
    } else if (!clients.length) {
        return (
            <Fragment>
                <Link to="/clients/createclient" className="btn btn-verde nvo-cliente">
                    <i className="fas fa-plus-circle"> </i>
                    Nuevo Cliente
                </Link>
                <Spinner/>
            </Fragment>
        )
    } else {
        return (

            <Fragment>
                <ul className="listado-clientes">
                    <h2>Clientes</h2>

                    <Link to="/clients/createclient" className="btn btn-verde nvo-cliente">
                        <i className="fas fa-plus-circle"> </i>
                        Nuevo Cliente
                    </Link>
                    {clients.map((client) => (
                        <Client key={client._id} client={client}/>
                    ))}
                </ul>
            </Fragment>
        );
    }
};

export default withRouter(Clients);