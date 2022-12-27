import React from 'react';
import { useDispatch } from 'react-redux';
import NavOptions from '../Navigation/NavOptions';
import './Navigation.scss';

function Navigation(props) {
    const dispatch = useDispatch();

    return (
        <div className="navigation">
            <div className="main-links">
                <img className="logo" src="images/ante_up.png" alt="ante up logo"></img>
                <NavOptions />
                <div className="logout">
                    <button className="nav-logout" onClick={() => dispatch( { type: 'LOGOUT' })}>Log Out </button>
                </div>    
            </div>
        </div>     
    )
}

export default Navigation;