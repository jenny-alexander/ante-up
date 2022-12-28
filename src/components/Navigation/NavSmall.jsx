import React from 'react';
import NavOptions from '../Navigation/NavOptions';
// import MenuIcon from '@mui/icons-material/Menu';
// import { IconButton } from '@mui/material';
import './Navigation.scss';

function NavSmall(props) {


    return (
        <div className="nav-small">
            <div className="main-links">
                <NavOptions />
            </div>
        </div>
    )
}

export default NavSmall;