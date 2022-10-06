import { React } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Navigation.scss';

function Navigation(props) {
    const dispatch = useDispatch();

    return (
        <div className="navigation">
            <div className="logo"> Ante Up
                {/* <span>Ante Up</span> */}
            </div>
            <div className="nav-links">
                <Link className="nav-home" to="/home">
                    Home
                </Link>

                <Link className="nav-about" to="/about">
                    About
                </Link>

            {/* <div className="logout"> */}
            {/* Todo: change to link? */}
                <button className="nav-logout" onClick={() => dispatch( { type: 'LOGOUT' })}>Log Out </button>
            </div>
        </div>
    )
}

export default Navigation;