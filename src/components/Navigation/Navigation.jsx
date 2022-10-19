import { React } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Navigation.scss';
//import mainLogo from 'images/ante_up.png';

function Navigation(props) {
    const dispatch = useDispatch();

    return (
            <div className="navigation">
                
                <div className="main-links">
                    <img className="logo" src="images/ante_up.png" alt="ante up logo"></img>
                    <div className="action-links">
                    <Link className="nav-dashboard" to="dashboard">
                            Dashboard
                        </Link>
                        <Link className="nav-money" to="/money">
                            Money
                        </Link>
                        <Link className="nav-chore" to="/chore">
                            Chores
                        </Link>                  
                        {/* <Link className="nav-home" to="/home">
                            Home
                        </Link> */}

                        <Link className="nav-about" to="/about">
                            About
                        </Link>
                    </div>
                    <div className="logout">
                        <button className="nav-logout" onClick={() => dispatch( { type: 'LOGOUT' })}>Log Out </button>
                    </div>
                </div>
            </div>
    )
}

export default Navigation;