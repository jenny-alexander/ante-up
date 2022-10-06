import { React } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Navigation.scss';
//import mainLogo from 'images/ante_up.png';

function Navigation(props) {
    const dispatch = useDispatch();

    return (
        <div className="navigation">
            <img className="logo" src="images/ante_up.png" ></img>
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