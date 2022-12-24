import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Navigation.scss';

function NavOptions(props) {
    const dispatch = useDispatch();
    const navOptions = [
        {name: 'Dashboard',
         className: 'nav-option',
         to: '/dashboard'
        },
        {name: 'Money',
         className: 'nav-option',
         to: '/money'
        },
        {name: 'Chores',
        className: 'nav-option',
        to: '/chore'
       },
       {name: 'Activity Log',
       className: 'nav-option',
       to: '/activity'
      },
    ]

    return (
        <div className="navigation">
            <div className="main-links">
                <img className="logo" src="images/ante_up.png" alt="ante up logo"></img>
                <div className="action-links">
                {
                    navOptions.map(option => 
                        <div>
                            <NavLink className={option.className} to={option.to}>{option.name}</NavLink>
                        </div>
                    )
                }
                </div>
                <div className="logout">
                    <button className="nav-logout" onClick={() => dispatch( { type: 'LOGOUT' })}>Log Out </button>
                </div>   
            </div>
             
        </div>  
    )
}

export default NavOptions;