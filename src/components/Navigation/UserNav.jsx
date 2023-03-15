import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';

function UserNav(props) {
    const navOptions = [
        {name: 'User Profile',
         className: 'nav-option',
         to: '/user',
         key: crypto.randomUUID(),
        },
    ]

    return (        
        <>                
            {
                navOptions.map(option => 
                        <NavLink key={option.key}
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