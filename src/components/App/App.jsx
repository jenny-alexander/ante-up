import React, { useEffect } from 'react';
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

  // const addModal = () => {
  //   ModalService.open(TestModal);
  // };

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    // <div className={Object.entries(user).length === 0 ? 'application large' : 'application small'}>
    <div className='application'>
      {/* <ModalRoot /> */}
      {/* <button onClick={ addModal } className="btn btn-primary-m4">Open modal</button> */}
      { Object.entries(user).length === 0 ?  <Welcome /> : <Navigation /> }
      <Header />

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
    {/* </BrowserRouter> */}
    <RightBorder />
    </div>

  )
}

export default App;
