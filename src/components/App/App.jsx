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
import Card from '../Common/Card/Card';
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
import './App.scss';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const week = useSelector(store => store.week);
  const [showSmallNav, setShowSmallNav] = useState(false);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({type: 'FETCH_WEEK'});
  }, [dispatch]);

  const toggleMenu = () => {
    console.log('toggling menu');
    setShowSmallNav(!showSmallNav);
  }

  return (
    <div className='application'>
      { Object.entries(user).length === 0 ?  <Welcome /> : <Navigation /> }
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
                { Object.entries(user).length !== 0 ?
                  <div class="welcome-text">
                      <div>Welcome {user.username}!</div>
                  </div> : null
                }
              </div>
            </div>

      <Routes>
        <Route path="/" element={user.id ? (<Dashboard user={user} week={week} />) : (<LoginPage />)} />
        <Route path="/login" element={user.id ? (<Dashboard user={user} week={week}/>) : (<LoginPage />)} />
        <Route path="/registration" element={user.id ? (<Dashboard user={user} week={week}/>) : (<RegisterPage />)} />
        <Route path="/dashboard" element={user.id ? (<Dashboard user={user}week={week}/>) : (<LoginPage />)} />
        <Route path="/money" element={user.id ? (<Money />) : (<LoginPage />)} />
        <Route path="/chore" element={user.id ? (<Chore user={user} />) : (<LoginPage />)} />
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
