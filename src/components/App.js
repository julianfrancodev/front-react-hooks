import React, {Fragment, useContext} from 'react';
import Header from "./layout/Header";
import Navbar from "./layout/Navbar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Clients from "./clients/Clients";
import Products from "./products/Products";
import Orders from "./orders/Orders";
import CreateClient from "./clients/CreateClient";
import EditClient from "./clients/EditClient";
import CreateProduct from "./products/CreateProduct";
import EditProduct from "./products/EditProduct";
import CreateOrder from "./orders/CreateOrder";
import Login from "./auth/Login";
import {Ccontext, Cprovider} from "../context/Ccontext";
import Spinner from "./layout/Spinner";

function App() {

    // useContext in the component

    const [auth, setToken] = useContext(Ccontext);

    return (
        <Router>
            <Fragment>
                <Cprovider value={[auth, setToken]}>
                    <Header/>

                    <div className="grid contenedor contenido-principal">
                        {<Navbar/>}

                        <main className="caja-contenido col-9">

                            {/*TODO: Routing for all components*/}

                            <Switch>

                                {/*CLIENTS*/}

                                <Route exact path="/" component={Clients}/>
                                <Route exact path="/clients" component={Clients}/>
                                <Route exact path="/clients/createclient" component={CreateClient}/>
                                <Route exact path="/clients/editclient/:clientId" component={EditClient}/>

                                {/*CLIENTS*/}
                                <Route exact path="/products" component={Products}/>
                                <Route exact path="/products/createproduct" component={CreateProduct}/>
                                <Route exact path="/products/editproduct/:productId" component={EditProduct}/>


                                {/*ORDERS*/}
                                <Route exact path="/orders" component={Orders}/>
                                <Route exact path="/orders/createorder/:clientId" component={CreateOrder}/>
                                <Route exact path="/orders/editorder/:orderId" component={CreateOrder}/>

                                {/*USERS*/}
                                <Route exact path="/log-in" component={Login}/>

                            </Switch>

                        </main>
                    </div>
                </Cprovider>
            </Fragment>
        </Router>
    );
}

export default App;
