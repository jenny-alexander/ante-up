import { React } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Navigation.scss';

function Navigation(props) {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);

    return (
        <div className="navigation">
                <div className="main-links">
                    <img className="logo" src="images/ante_up.png" alt="ante up logo"></img>
                    <div className="action-links">
                            {/* <div> */}
                                {/* <NavLink className={`nav-dashboard ${isActive ? "isActive" : "" }`} to="/dashboard"> */}
                                {/* <NavLink className="nav-dashboard" to="/dashboard">
                                    Dashboard
                                </NavLink> */}
                            {/* </div> */}
                        <div>
                            <NavLink 
                            //className={`nav-dashboard ${({ isActive }) => isActive ? activeClassName : ''}`}
                                className={({ isActive }) => (isActive ? 'nav-dashboard isActive' : 'nav-dashboard')}
                                to="/dashboard">
                                Dashboard
                            </NavLink>
                        </div>                            
                        <div>
                            <NavLink 
                                    className={({ isActive }) => (isActive ? 'nav-money isActive' : 'nav-money')}
                                    to="/money">
                                    Money
                            </NavLink>
                        </div>
                        <div>
                            <NavLink 
                                className={({ isActive }) => (isActive ? 'nav-chore isActive' : 'nav-chore')}
                                to="/chore">
                                Chores
                            </NavLink>
                        </div>
                        <div>
                            <NavLink 
                                className={({ isActive }) => (isActive ? 'nav-activity isActive' : 'nav-activity')}
                                to="/activity">
                                Activity Log
                            </NavLink>
                        </div>                        
                        </div>
                    { Object.entries(user).length === 0 ? '' : 
                        <div className="logout">
                            <button className="nav-logout" onClick={() => dispatch( { type: 'LOGOUT' })}>Log Out </button>
                        </div>
                    }
                </div>
            </div>  
    )
}

export default Navigation;