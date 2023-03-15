import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';

function NavOptions(props) {
    const navOptions = [
        {name: 'Dashboard',
         className: 'nav-option',
         to: '/dashboard',
         key: crypto.randomUUID(),
        },
        {name: 'Money',
         className: 'nav-option',
         to: '/money',
         key: crypto.randomUUID(),
        },
        {name: 'Chores',
        className: 'nav-option',
        to: '/chore',
        key: crypto.randomUUID(),
       },
       {name: 'About',
       className: 'nav-about',
       to: '/about',
       key: crypto.randomUUID(),
      },
    ]

    return (        
            <>                
                <div className="action-links">
                {
                    navOptions.map(option => 
                        <div key={option.key}>
                            <NavLink onClick={props.toggleMenu} className={option.className} to={option.to}>{option.name}
                                
                            </NavLink>
                        </div>
                    )
                }
                </div>              
            </>                    
    )
}

export default NavOptions;