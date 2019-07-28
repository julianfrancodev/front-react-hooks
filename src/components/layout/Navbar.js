import React, {Fragment, useContext} from 'react';
import {Link} from "react-router-dom";
import {Ccontext} from "../../context/Ccontext";

const Navbar = () => {

    const [auth] = useContext(Ccontext);

    return (
        <Fragment>


            {auth.token ? (
                    <aside className="sidebar col-3">
                        <h2>Administración</h2>
                        <nav className="navegacion">
                            <Link to={'/clients'} className="clientes">Clientes</Link>
                            <Link to={'/products'} className="productos">Productos</Link>
                            <Link to={'/orders'} className="pedidos">Pedidos</Link>
                        </nav>
                    </aside>
                )
                : null
            }


        </Fragment>
    );
};

export default Navbar;

