import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Header.scss';

function Header(props) {
    const user = useSelector((store) => store.user);
    return (
        <div className='header'>
            <h1 className="home-title">
                Welcome {user.username}!
            </h1>
        </div>
    )
}

export default Header;