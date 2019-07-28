import React, {Fragment, useState, useContext, useEffect} from 'react';
import Swal from 'sweetalert2';
import clientAxios from '../../config/axios';
import {withRouter,Redirect} from "react-router-dom";
import {Ccontext} from "../../context/Ccontext";


const Login = (props) => {

    const [auth, setToken] = useContext(Ccontext);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {

        setToken({
            auth: null
        });

    }, [setToken]);


    return (
        <Fragment>
            {!auth.token ? <div className='login'>
                <h2>Iniciar Sesion</h2>

                <div className='contenedor-formulario'>
                    <form onSubmit={async (e) => {
                        e.preventDefault();

                        try {
                            const res = await clientAxios.post('/login', user);

                            const {token} = res.data;

                            localStorage.setItem('token', token);

                            Swal.fire({
                                type: 'success',
                                title: 'Login Correcto',
                                text: 'Bienvenido'

                            });

                            setToken({
                                token
                            });

                            props.history.push('/clients')

                        } catch (error) {
                            Swal.fire({
                                type: 'error',
                                title: 'Ooops hubo un error',
                                text: error.response.data.message
                            });
                            localStorage.removeItem('token');
                        }
                    }}>
                        <div className='campo'>
                            <label>
                                Email
                            </label>
                            <input
                                onChange={async (e) => {
                                    setUser({
                                        email: e.target.value
                                    })
                                }}
                                type='text'
                                name='email'
                                placeholder='Email'
                                required={true}
                            />
                        </div>

                        <div className='campo'>
                            <label>
                                Password
                            </label>
                            <input
                                onChange={(e) => {
                                    setUser({
                                        ...user,
                                        password: e.target.value
                                    })
                                }}
                                type='password'
                                name='password'
                                placeholder='Password'
                                required={true}
                            />
                        </div>

                        <input type='submit' value='Ingresar' className='btn btn-verde btn-block'/>


                    </form>
                </div>
            </div>
                :
                <Redirect to={'/clients'}/>
            }
        </Fragment>
    )
};

export default withRouter(Login);