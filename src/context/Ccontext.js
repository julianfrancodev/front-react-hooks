import React, {useState} from 'react';

const Ccontext = React.createContext([{}, () => {
}]);

const Cprovider = (props) => {

    const token = localStorage.getItem('token');

    const [auth, setToken] = useState({
        token: token
    });

    return (
        <Ccontext.Provider value={[auth, setToken]}>
            {props.children}
        </Ccontext.Provider>
    )
};

export {Ccontext, Cprovider};

