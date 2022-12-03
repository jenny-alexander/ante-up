import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './DashboardCalendar.scss';

function DashboardCalendar(props) {
    const today = new Date();
    //const dispatch = useDispatch();
    const[selectedDay, setSelectedDay] = useState(today);

    // useEffect(() => {
    //     console.log('in useEffect of DashboardCalendar and props are:', props);
    //     dispatch( { type: 'FETCH_LATEST_ALLOWANCE', payload: props.user.id });
    // },[])

    return (
        <div className="calendar-container">
            <DayPicker selected={selectedDay} />
        </div>
        
    )
}
export default DashboardCalendar;
