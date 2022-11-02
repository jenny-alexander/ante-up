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

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Welcome from '../Welcome/Welcome';

import './App.scss';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    // <div className={Object.entries(user).length === 0 ? 'application large' : 'application small'}>
    <div className='application'>
      { Object.entries(user).length === 0 ?  <Welcome /> : <Navigation user={user} /> }
      <Header />

      <Routes>
        <Route path="/" element={user.id ? (<Dashboard />) : (<LoginPage />)} />
        <Route path="/login" element={user.id ? (<Dashboard />) : (<LoginPage />)} />
        <Route path="/registration" element={user.id ? (<Dashboard />) : (<RegisterPage />)} />
        <Route path="/dashboard" element={user.id ? (<Dashboard />) : (<LoginPage />)} />
        <Route path="/money" element={user.id ? (<Money />) : (<LoginPage />)} />
        <Route path="/chore" element={user.id ? (<Chore />) : (<LoginPage />)} />
        <Route path="/activity" element={user.id ? (<ActivityLog />) : (<LoginPage />)} />
        {/* <Route>
          <h1>404</h1>
        </Route> */}
      </Routes>
    {/* </BrowserRouter> */}
    </div>


//TODO: Check protected route and check 404

    //react-router-dom v5
    // <Router>
    //   <div>

    //     <Switch>
    //       {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
    //       <Redirect exact from="/" to="/home" />

    //       {/* For protected routes, the view could show one of several things on the same route.
    //         Visiting localhost:3000/user will show the Home page if the user is logged in.
    //         If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
    //         Even though it seems like they are different pages, the user is always on localhost:3000/user */}
    //       <ProtectedRoute
    //         // logged in shows Home page else shows LoginPage
    //         exact
    //         path="/user"
    //       >
    //         <Home />
    //       </ProtectedRoute>


    //       {/* If none of the other routes matched, we will show a 404. */}
    //       <Route>
    //         <h1>404</h1>
    //       </Route>
    //     </Switch>

    //   </div>
    // </Router>
  )
}

export default App;
