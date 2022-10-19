import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Header.scss';

function Header(props) {
    const user = useSelector((store) => store.user);
    return (
        <div className='header'>
            <div className="home-title">
                Welcome {user.username}!
            </div>
        </div>
    )
}

export default Header;