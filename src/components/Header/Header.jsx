import React, {useEffect} from 'react';
import {  useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import './Header.scss';

function Header(props) {
    const user = useSelector((store) => store.user);


    const onMenuClick = () => {
        console.log('clicked on menu icon');
        return (
            <div>Hi</div>
        )
    }

    return (
        <div className='header'>
            { Object.entries(user).length === 0 ? 
                <div className="no-header"></div>
             :
            <div class="header-container">
                <IconButton className="menu-icon" onClick={()=> {onMenuClick()}}>
                    <MenuIcon></MenuIcon>
                </IconButton>
                {/* <div class="image">
                    <img className="logo" src="images/ante_up.png" alt="ante up logo"></img>
                </div> */}
                <div class="welcome-text">
                    <div>Welcome {user.username}!</div>
                </div>
          </div>
}
        </div>
    )
}

export default Header;