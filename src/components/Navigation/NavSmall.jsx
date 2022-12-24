import React, {useState} from 'react';
import NavOptions from '../Navigation/NavOptions';
import './Navigation.scss';

function NavSmall(props) {
    const [toggleMenu, setToggleMenu] = useState(false);

    const handleToggle = () => {
        console.log('you clicked on handleToggle')
        setToggleMenu(!toggleMenu)
    }

    return (
        <div className="nav-small">
            <button onClick={handleToggle}>Menu</button>
            {
                toggleMenu ? <NavOptions handleToogle={handleToggle} /> : ''
            }            
        </div>
             
    )
}

export default NavSmall;