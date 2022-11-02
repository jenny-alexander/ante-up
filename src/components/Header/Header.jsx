import React, {useEffect} from 'react';
import {  useSelector } from 'react-redux';
import './Header.scss';

function Header(props) {
    const user = useSelector((store) => store.user);

    return (
        <div className='header'>
            { Object.entries(user).length === 0 ? 
                <div className="no-header"></div>
             :
            <div class="header-container">
                <div class="image">
                    <img className="logo" src="images/ante_up.png" alt="ante up logo"></img>
                </div>
                <div class="text">
                    <div>Welcome {user.username}!</div>
                </div>
          </div>
}
        </div>
    )
}

export default Header;