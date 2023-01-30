import React, {useState} from 'react';
import NavSmall from '../Navigation/NavSmall';
import UserMenu from '../UserMenu/UserMenu';
import './Header.scss';

function Header(props) {
    const [showSmallNav, setShowSmallNav] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const toggleMenu = () => {        
        setShowSmallNav(!showSmallNav);
    }

    const toggleUserMenu = () => {        
        setShowUserMenu(!showUserMenu);
    }

    return (
        <div className='header'>            
            <div className="header-container">
                <button onClick={toggleMenu}
                className={`button-container ${showSmallNav ? 'active' : 'not-active'}`} 
                id="toggle">
                    <span class="top"></span>
                    <span class="middle"></span>
                    <span class="bottom"></span>
                </button>
                <div className={`overlay ${showSmallNav ? 'open' : 'not-open'}`}>
                    <NavSmall toggleMenu={toggleMenu} />
                </div>            
                {/* { Object.entries(props.user).length !== 0 ? */}
                    <div className="header-info">
                        <div className="week-info">Week of: {props.weekInfo}</div>                                                                    
                        <button className="profile-info" onClick={toggleUserMenu}>    
                            {/* <div className="username">{props.user.username}</div> */}
                            <img className="profile-image" src="/images/profile/hades.png"/>
                        </button>                
                    </div>
                    {/* : null
                } */}
                </div>
                { 
                    showUserMenu ? 
                        <UserMenu toggleUserMenu={toggleUserMenu}
                            //onClickOutside={toggleUserMenu} 
                            user={props.user} 
                        /> : null 
                    }
      </div>
    )
}

export default Header;