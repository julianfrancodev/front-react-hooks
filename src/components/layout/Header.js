import React, {useContext} from 'react';
import {Ccontext} from "../../context/Ccontext";
import {withRouter} from "react-router-dom";

const Header = (props) => {

    const [auth, setToken] = useContext(Ccontext);

    return (
        <header className="barra">
            <div className="contenedor">
                <div className='contenido-barra'>
                    <h1>CRM - Administrador de Clientes</h1>
                    {auth.token ? (
                        <button
                            onClick={() => {
                                setToken({
                                    token: null
                                });
                                localStorage.removeItem('token');
                                props.history.push('/log-in');
                            }}
                            type='button'
                            className='btn btn-rojo'>
                            Cerrar Sesion
                        </button>
                    ) : null}

                </div>
            </div>
        </header>
    );
};

export default withRouter(Header);