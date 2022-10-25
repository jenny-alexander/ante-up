import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
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
import Home from '../Home/Home';
import Card from '../Common/Card/Card';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
  // const money = useSelector(store => store.money);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'FETCH_MONEY', payload: user.id });
  }, [dispatch]);

  return (
    <Router>
      <div className="application">
        <Navigation />
        <Header />

        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the Home page if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows Home page else shows LoginPage
            exact
            path="/user"
          >
            <Home />
          </ProtectedRoute>

          <Route exact path="/dashboard">
            {user.id ? <Dashboard /> : <LoginPage />}
          </Route>

          <Route exact path="/money">
            {user.id ? <Money /> : <LoginPage />}
          </Route>

          <Route exact path="/chore">
            {user.id ? <Chore /> : <LoginPage />}
          </Route>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Home page
              <Home />
            }
          </Route>

          <Route exact path="/activity">
            { <ActivityLog />}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
