import React, {useEffect, useRef} from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faXmark } from '@fortawesome/free-solid-svg-icons';
import UserNav from '../Navigation/UserNav';
import './UserMenu.scss';

function UserMenu(props) {
    const ref = useRef(null);
    const { onClickOutside } = props;
    const dispatch = useDispatch();

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //       event.stopPropagation();
    //       if (ref.current && !ref.current.contains(event.target)) {
    //         onClickOutside && onClickOutside(ref);
    //       }          
    //     };
    //     document.addEventListener('click', handleClickOutside, true);
    //     return () => {
    //       document.removeEventListener('click', handleClickOutside, true);
    //     };
    //   }, [ onClickOutside ]);

    const logout = () => {
      props.toggleUserMenu();
      dispatch( { type: 'LOGOUT' })
    }

    return (
        <div 
          ref={ref}
           className="user-menu-wrap">
            <div className="user-menu">
            {/* <div class="caret"></div> */}
                <div className="user-menu-header">
                    <button className="close-user-menu" 
                            onClick={props.toggleUserMenu}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                <div className="user-menu-name">
                    <img className="menu-profile-image" src="/images/profile/hades-large.png"/>
                    <div className='user-menu-profile'>
                      <div className="profile-username">{props.user.username}</div>
                      <div className="profile-type">{props.user.type}</div>          
                    </div>                            
                </div>
                <div className="user-menu-nav-option">
                    <UserNav toggleUserMenu={props.toggleUserMenu} />
                    <div className="logout">
                        <button className="nav-logout" 
                                onClick={logout}                                
                        >Log Out </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserMenu;