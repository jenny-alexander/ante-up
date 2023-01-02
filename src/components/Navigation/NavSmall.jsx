import React from 'react';
import NavOptions from '../Navigation/NavOptions';
import './Navigation.scss';

function NavSmall(props) {
    return (
        <div className="nav-small">
            <div className="main-links">
                <NavOptions toggleMenu={props.toggleMenu} />
            </div>
        </div>
    )
}
export default NavSmall;