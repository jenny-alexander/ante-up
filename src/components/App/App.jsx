import React, { useEffect, useState } from 'react';
import { Route, Routes} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../Navigation/Navigation';
import Dashboard from '../Dashboard/Dashboard';
import Money from '../Money/Money';
import About from '../About/About';
import Chore from '../Chore/Chore';
import UserProfile from '../UserProfile/UserProfile';
import Header from '../Header/Header';
import RightBorder from '../RightBorder/RightBorder';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Welcome from '../Welcome/Welcome';
import './App.scss';

function App() {
  console.log('*** rendering App.jsx)')
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const week = useSelector(store => store.week);
  // const allowance = useSelector(store => store.allowance)
  const [loggedIn, setLoggedIn] = useState(false);
  const [weekInfo, setWeekInfo] = useState({});  
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
                  "October", "November", "December"];

  useEffect(() => {
    dispatch({type: 'FETCH_WEEK'});
    dispatch({ type: 'GET_ALL_CHORE_REQUESTED'});
  }, []);

  useEffect(() => {
    if (Object.entries(week).length !== 0 ) {
      setWeekInfo({...weekInfo,
                    weekID: week.id,
                    allowanceDate: week.allowance_date,
                    startDate: week.start_date,
                    endDate: week.end_date,
      })
      if(week.id > 0 && user.id > 0 ) {        
        dispatch({type:'FETCH_LATEST_ALLOWANCE', 
                  payload:
                    { weekId: week.id,
                      userId: user.id
                    }});
      }
    }
    if (user.id > 0) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    };
    
  },[week, user])

  const getDateString = (date) => {
    const datum = new Date(date);
    const dateOfWeek = datum.getDate();
    const month = months[datum.getMonth()];
    const year = datum.getFullYear();    
    return  month +  ', ' + dateOfWeek + ' ' + year;
}

  return (
    <div className={`${loggedIn ? 'application logged-in' : 'application'}`}>      
      { 
        Object.entries(user).length === 0 ?  
          <Welcome /> 
            : 
          <>
          <Navigation className="show-nav" />
          <Header user={user} weekInfo={getDateString(week.start_date)}/>
          </>
      }        
        <Routes>
          <Route path="/" element={user.id ? (<Dashboard />) : (<LoginPage />)} />
          <Route path="/login" element={user.id ? (<Dashboard />) : (<LoginPage />)} />
          <Route path="/registration" element={user.id ? (<Dashboard />) : (<RegisterPage />)} />
          <Route path="/dashboard" element={user.id ? (<Dashboard />) : (<LoginPage />)} />
          <Route path="/money" element={user.id ? (<Money />) : (<LoginPage />)} />
          <Route path="/chore" element={user.id ? (<Chore />) : (<LoginPage />)} />
          <Route path="/about" element={user.id ? (<About />) : (<LoginPage />)} />
          <Route path="/user" element={user.id ? (<UserProfile user={user} />) : (<LoginPage />)} />
        </Routes>
      <RightBorder />
    </div>

  )
}

export default App;