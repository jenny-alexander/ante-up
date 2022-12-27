import React, {useState} from 'react';
import NavOptions from '../Navigation/NavOptions';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import './Navigation.scss';

function NavSmall(props) {
    const [toggleMenu, setToggleMenu] = useState(false);

    const handleToggle = () => {
        console.log('you clicked on handleToggle')
        setToggleMenu(!toggleMenu)
    }

    return (
        // <div className="navigation">
        <div className="nav-small">
                        <div className="main-links">
            {/* <IconButton className="menu-icon" onClick={handleToggle}>
                <MenuIcon></MenuIcon>
            </IconButton>
            {
                toggleMenu ? <NavOptions handleToogle={handleToggle} /> : ''
            }             */}
            <NavOptions />
            </div>
        </div>
        // </div>
    )
}

export default NavSmall;