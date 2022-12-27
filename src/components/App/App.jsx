import React, { useEffect, useState } from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../Navigation/Navigation';
import Dashboard from '../Dashboard/Dashboard';
import Money from '../Money/Money';
import Chore from '../Chore/Chore';
// import About from '../About/About';
import ActivityLog from '../ActivityLog/ActivityLog';
import Header from '../Header/Header';
import RightBorder from '../RightBorder/RightBorder';
import NavSmall from '../Navigation/NavSmall';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Welcome from '../Welcome/Welcome';

// import ModalService from '../../modules/modals/services/ModalService';
// import TestModal from '../Modal/TestModal';
import './App.scss';


function App() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const [showSmallNav, setShowSmallNav] = useState(false);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  const toggleMenu = () => {
    console.log('toggling menu');
    setShowSmallNav(!showSmallNav);
  }

  return (
    <div className='application'>
      { Object.entries(user).length === 0 ?  <Welcome /> : <Navigation /> }
      {/* <Header /> */}
      {/* <div className='header'>
            { Object.entries(user).length === 0 ? 
                <div className="no-header"></div>
             :
            <div class="header-container">
                <NavSmall />
                <div class="welcome-text">
                    <div>Welcome {user.username}!</div>
                </div>
          </div>
}
      </div> */}


            {/* <div className="button_container" id="toggle">
              <button className='menu-button' onClick={toggleMenu}>Menu</button>
            </div> */}
            <div className='header'>
              <div className="header-container">
                <IconButton className="menu-icon" onClick={toggleMenu}>
                  <MenuIcon></MenuIcon>
                </IconButton>
              {/* <div className="overlay" id="overlay"> */}
                <div className={`overlay ${showSmallNav ? 'open' : ''}`}>
                  <NavSmall />
                </div>
                <div class="welcome-text">
                    <div>Welcome {user.username}!</div>
                </div>
              </div>
            </div>

      <Routes>
        <Route path="/" element={user.id ? (<Dashboard user={user} />) : (<LoginPage />)} />
        <Route path="/login" element={user.id ? (<Dashboard user={user}/>) : (<LoginPage />)} />
        <Route path="/registration" element={user.id ? (<Dashboard user={user}/>) : (<RegisterPage />)} />
        <Route path="/dashboard" element={user.id ? (<Dashboard user={user}/>) : (<LoginPage />)} />
        <Route path="/money" element={user.id ? (<Money />) : (<LoginPage />)} />
        <Route path="/chore" element={user.id ? (<Chore />) : (<LoginPage />)} />
        <Route path="/activity" element={user.id ? (<ActivityLog />) : (<LoginPage />)} />
        {/* <Route>
          <h1>404</h1>
        </Route> */}
      </Routes>
    <RightBorder />
    </div>

  )
}

export default App;
