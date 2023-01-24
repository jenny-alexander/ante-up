import React, {useEffect, useRef} from 'react';
import { useDispatch } from 'react-redux';
import UserNav from '../Navigation/UserNav';
import './UserMenu.scss';

function UserMenu(props) {
    const ref = useRef(null);
    const { onClickOutside } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        const handleClickOutside = (event) => {
          event.stopPropagation();
          if (ref.current && !ref.current.contains(event.target)) {
            onClickOutside && onClickOutside(ref);
          }          
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        };
      }, [ onClickOutside ]);

    return (
        <div 
          ref={ref}
           className="user-menu-wrap">
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