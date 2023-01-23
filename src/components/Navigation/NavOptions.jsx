import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';

function NavOptions(props) {
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
            <>                
                <div className="action-links">
                {
                    navOptions.map(option => 
                        <div>
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