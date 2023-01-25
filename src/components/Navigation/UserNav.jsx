import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';

function UserNav(props) {
    const navOptions = [
        {name: 'Edit Profile',
         className: 'nav-option',
         to: '/user'
        },
        {name: 'Help',
        className: 'nav-option',
        to: '/help'
       },
    ]

    return (        
        <>                
            {
                navOptions.map(option => 
                        <NavLink 
                            onClick={props.toggleUserMenu} 
                            className={option.className} 
                            to={option.to}>{option.name}
                        </NavLink>
                )
            }         
        </>                    
    )
}

export default UserNav;