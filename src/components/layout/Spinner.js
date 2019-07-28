import React, {Fragment} from 'react';
import './Spinner.css';

const Spinner = () => {

    return (
        <Fragment>
            <div className="sk-folding-cube">
                <div className="sk-cube1 sk-cube"></div>
                <div className="sk-cube2 sk-cube"></div>
                <div className="sk-cube4 sk-cube"></div>
                <div className="sk-cube3 sk-cube"></div>
            </div>
        </Fragment>
    );

};
export default Spinner;