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
                        <div>
                            <Link className="nav-dashboard" to="dashboard">
                                Dashboard
                            </Link>
                        </div>
                        <div>
                        <Link className="nav-money" to="/money">
                            Money
                        </Link>
                        </div>
                        <div>
                            <Link className="nav-chore" to="/chore">
                                Chores
                            </Link>
                        </div>
                        <div>
                        <Link className="nav-activity" to="/activity">
                            Activity Log
                        </Link>      
                        </div>                                
                        {/* <Link className="nav-home" to="/home">
                            Home
                        </Link> */}

                        {/* <Link className="nav-about" to="/about">
                            About
                        </Link> */}
                    </div>
                    <div className="logout">
                        <button className="nav-logout" onClick={() => dispatch( { type: 'LOGOUT' })}>Log Out </button>
                    </div>
                </div>
            </div>
    )
}

export default Navigation;