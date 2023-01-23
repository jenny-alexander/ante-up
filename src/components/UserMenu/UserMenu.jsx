import React from 'react';
import { useDispatch } from 'react-redux';
import UserNav from '../Navigation/UserNav';
import './UserMenu.scss';

function UserMenu(props) {
    const dispatch = useDispatch();
    return (
        <div className="user-menu-wrap">
            <div className="user-menu">
                <div className="user-menu-name">
                    <h2>{props.user.username}</h2>                    
                </div>
                <div className="user-menu-nav-option">
                    <UserNav />
                    <div className="logout">
                        <button className="nav-logout" onClick={() => dispatch( { type: 'LOGOUT' })}>Log Out </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserMenu;