import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';

function UserNav(props) {
    const navOptions = [
        {name: 'UserProfile',
         className: 'user-profile',
         to: '/user'
        },
        {name: 'Help',
        className: 'nav-help',
        to: '/help'
       },
    ]

    return (        
        <>                
            {
                navOptions.map(option => 
                    // <div>
                        <NavLink onClick={props.toggleMenu} className={option.className} to={option.to}>{option.name}</NavLink>
                    // </div>
                )
            }         
        </>                    
    )
}

export default UserNav;