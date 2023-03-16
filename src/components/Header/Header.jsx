import React, {useState, useEffect} from 'react';
import NavSmall from '../Navigation/NavSmall';
import UserMenu from '../UserMenu/UserMenu';
import './Header.scss';

function Header(props) {
    const [showSmallNav, setShowSmallNav] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleWindowResize);
  
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    });

    const toggleMenu = () => {        
        setShowSmallNav(!showSmallNav);
    }

    const toggleUserMenu = () => {        
        setShowUserMenu(!showUserMenu);
    }

    return (
        <div className={`${Object.entries(props.user).length > 0 ? 'header logged-in' : 'header'}`}>   
        {
            Object.entries(props.user).length === 0 && windowWidth < 651 ? 
                <div className="login-logo">
                    <img className="logo" src="images/ante_up_welcome.png" alt="ante up logo"></img>
                </div>
            :
                <>
                    {Object.entries(props.user).length > 0 ?
                    <>
                    <div className="header-container">
                        <button onClick={toggleMenu}
                        className={`button-container ${showSmallNav ? 'active' : 'not-active'}`} 
                        id="toggle">
                            <span className="top"></span>
                            <span className="middle"></span>
                            <span className="bottom"></span>
                        </button>
                        <div className={`overlay ${showSmallNav ? 'open' : 'not-open'}`}>
                            <NavSmall toggleMenu={toggleMenu} />
                        </div>            
                        <div className="header-info">
                            <div className="week-info">Week of: {props.weekInfo}</div>                                                                    
                            <button className="profile-info" onClick={toggleUserMenu}>                                                    
                                <img className="profile-image" src={`/images/profile/${props.user.avatar}.png`}/>                            
                            </button>                
                        </div>
                    </div>
                        { 
                            showUserMenu ? 
                                <UserMenu toggleUserMenu={toggleUserMenu}
                                    user={props.user} 
                                /> : null 
                            }
                            </>
                        : null }
                </>
        }
      </div>
    )
}

export default Header;