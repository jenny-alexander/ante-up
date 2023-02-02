import React, { useEffect, useState } from 'react';
import { Route, Routes} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../Navigation/Navigation';
import Dashboard from '../Dashboard/Dashboard';
import Money from '../Money/Money';
import Chore from '../Chore/Chore';
import ActivityLog from '../ActivityLog/ActivityLog';
import Help from '../Help/Help';
import UserProfile from '../UserProfile/UserProfile';
import Header from '../Header/Header';
import RightBorder from '../RightBorder/RightBorder';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Welcome from '../Welcome/Welcome';
import '../Header/Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './App.scss';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const week = useSelector(store => store.week);
  const [weekInfo, setWeekInfo] = useState({});  
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
                  "October", "November", "December"];

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({type: 'FETCH_WEEK'});
    dispatch({type:'FETCH_ALLOWANCE'});
  }, []);

  useEffect(() => {
    if (Object.entries(week).length !== 0 ) {
      setWeekInfo({...weekInfo,
                    week_no: week.week_no,
                    allowanceDate: week.allowance_date,
                    startDate: week.start_date,
                    endDate: week.end_date,
      })
    }
  },[week])


  const getDateString = (date) => {
    const datum = new Date(date);
    const dateOfWeek = datum.getDate();
    // const dayOfWeek = weekday[datum.getDay()];
    const month = months[datum.getMonth()];
    const year = datum.getFullYear();    
    return  month +  ', ' + dateOfWeek + ' ' + year;
}

  return (
    <div className='application'>      
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
          <Route path="/" element={user.id ? (<Dashboard user={user} week={weekInfo} />) : (<LoginPage />)} />
          <Route path="/login" element={user.id ? (<Dashboard user={user} week={weekInfo}/>) : (<LoginPage />)} />
          <Route path="/registration" element={user.id ? (<Dashboard user={user} week={weekInfo}/>) : (<RegisterPage />)} />
          <Route path="/dashboard" element={user.id ? (<Dashboard user={user} week={weekInfo}/>) : (<LoginPage />)} />
          <Route path="/money" element={user.id ? (<Money />) : (<LoginPage />)} />
          <Route path="/chore" element={user.id ? (<Chore user={user} week={weekInfo} />) : (<LoginPage />)} />
          <Route path="/activity" element={user.id ? (<ActivityLog />) : (<LoginPage />)} />
          <Route path="/help" element={user.id ? (<Help />) : (<LoginPage />)} />
          <Route path="/user" element={user.id ? (<UserProfile user={user} />) : (<LoginPage />)} />
          {/* <Route>
            <h1>404</h1>
          </Route> */}
        </Routes>
      {/* <RightBorder /> */}
    </div>

  )
}

export default App;
