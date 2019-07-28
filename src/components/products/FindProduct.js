import React, {Fragment} from 'react';

const FindProduct = (props) => {
    return (
        <Fragment>

            <form onSubmit={props.findProduct}>
                <legend>Busca un Producto y agrega una cantidad</legend>

                <div className="campo">
                    <label>Productos:</label>
                    <input
                        onChange={props.readDataFind}
                        type="text"
                        placeholder="Nombre Productos"
                        name="productos"/>
                </div>

                <input
                type="submit"
                className="btn btn-azul btn-block"
                value="Buscar Producto"
                />

            </form>
        </Fragment>
    );
};

export default FindProduct;